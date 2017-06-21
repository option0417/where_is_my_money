const express = require('express');
const api = express();
const cors = require('cors');


// HTTP Body parser
const bodyParser= require('body-parser');
// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({extended: true}));
// parse application/json 
api.use(bodyParser.json());
// parse text/*
api.use(bodyParser.text());

// Enable CORS
api.use(cors());

// Setup Mongodb
const mongoClient = require('mongodb').MongoClient
const logger = require('mongodb').Logger
var url = 'mongodb://localhost:27017/db_wimm';
var dbConn;

mongoClient.connect(
		url,
		{poolSize : 5},
		function(err,  db) {
  if (err == null) {
	  console.log("Connected successfully to server");
	  dbConn = db;
	  console.log(dbConn);

		logger.setLevel("debug");
  } else {
	  console.error(err);
	}
});

// Import Data Models
const mPayment = require('./model/payment.js');

api.post('/record', function(req, res) {
	console.log('do post');
  showReq(req);

  var currTime = getCurrTimeMillis(); 
	var payment = new mPayment.Payment(
		createPaymentID() + '-' + currTime,
		req.body.payment_type,
		req.body.item_name,
		req.body.item_price,
		req.body.amount,
		req.body.payment_cost, 
		currTime,
		currTime
	);
	showPayment(payment);

	dbConn.collection('Payment').insertOne(payment, function(err,  result) {
	  if (err == null) {
			console.log(result);
		} else {
			console.error(err);
		}
	});

	res.set(
		{
			'Access-Control-Allow-Origin' : req.get('Origin')
		}
	);
	res.sendStatus(200);
});

api.get('/record', function (req, res) {
	console.log('do get');
	showReq(req);
	res.set(
		{
			'Access-Control-Allow-Origin' : req.get('Origin')
		}
	);
	
	if (req.query.tp != null) {
		dbConn.collection('Payment').find({"payment_type":req.query.tp}).toArray( function(err,  payments) {
		  if (err == null) {
			  res.send(payments);
		  } else {
		    res.send(err);
		  }
	  });
  } else if (req.query.st_date != null && req.query.ed_date != null) {
		dbConn.collection('Payment').find(
				{$and: [{"create_time": {$gte : parseInt(req.query.st_date)}},  {"create_time": {$lte : parseInt(req.query.ed_date)}}]}
				).toArray( function(err,  payments) {
		  if (err == null) {
				console.log("P: " + payments);
			  res.send(payments);
		  } else {
		    res.send(err);
		  }
	  });
  } else {  
		dbConn.collection('Payment').find().toArray( function(err,  payments) {
		  if (err == null) {
			  res.send(payments);
		  } else {
		    res.send(err);
		  }
	  });
	}
});

api.put('/record',  function(req, res) {
  console.log('do put');
	showReq(req);
	res.sendStatus(200);
});

api.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

function showReq(req) {
  console.log("Show header");
	console.log(req.headers);

	console.log("Show query");
	console.log(req.query);

	console.log("Show body");
	console.log(req.body);
}

function showPayment(payment) {
  console.log('Show Payment');
	console.log('Payment ID: ' + payment.payment_id);
	console.log('Payment Type: ' + payment.payment_type);
	console.log('Item Name: ' + payment.item_name);
	console.log('Item Price: ' + payment.item_price);
	console.log('Amount: ' + payment.amount);
	console.log('Payment Cost: ' + payment.payment_cost);
	console.log('Create Time: ' + payment.create_time);
	console.log('Update Time: ' + payment.update_time);
}

function createPaymentID() {
	var prefix = '';
	var min = 97;
	var max = 122;
  
	while (prefix.length != 3) {
	  var random = Math.floor(Math.random() * (max - min) + min);
    prefix += String.fromCharCode(random);
	}
	return prefix;
}

function getCurrTimeMillis() {
	return new Date().getTime();
}

// Shutdown hook
process.on('exit', function() {
  console.log('WIMM Exit');

  if (dbConn != null) {
		console.log('Closing DB Connection');
		dbConn.close();
	}
});

process.on('SIGTERM',  function () {
  console.log('WIMM SIGTERM');
	process.exit(1);
});

process.on('SIGINT',  function () {
  console.log('WIMM SIGINT');
	process.exit(1);
});

