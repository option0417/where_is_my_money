module.exports = {
	postPayment : postPayment, 
	getPayment : getPayment
}

const domain = require('../model/payment.js');

// Setup Mongodb
const mongoClient = require('mongodb').MongoClient
const logger = require('mongodb').Logger
var url = 'mongodb://localhost:27017/db_wimm';
var dbConn;

mongoClient.connect(
		url, 
    {poolSize : 5}, 
    function(err,   db) {
			if (err == null) {
				console.log("Connected successfully to db");
				dbConn = db;
				console.log(dbConn);
				
				logger.setLevel("debug");
			} else {
				console.error(err);
			}
		}
);

// Post Payment
function postPayment(req) {
	var currTime = getCurrTimeMillis();
	var payment = new domain.Payment(
			createPaymentID() + '-' + currTime, 
			req.body.payment_type, 
			req.body.item_name, 
			req.body.item_price, 
			req.body.amount, 
			req.body.payment_cost,  
			currTime, 
			currTime);
	
	showPayment(payment);
	
	dbConn.collection('Payment').insertOne(payment,  function(err,   result) {
		if (err == null) {
		  console.log(result);
		} else {
			console.error(err);
		}
	});
}

// Get Payment
function getPayment(req,  res) {
	var result;
	if (req.query.tp != null) {
		dbConn.collection('Payment').find({"payment_type":req.query.tp}).toArray( function(err,  payments) {
		  if (err == null) {
			  result = payments;
		  } else {
		    result = err;
		  }
	res.set(
			{ 'Access-Control-Allow-Origin' : req.get('Origin') }
	);
	res.send(result);
	  });
  } else if (req.query.st_date != null && req.query.ed_date != null) {
		dbConn.collection('Payment').find(
				{$and: [{"create_time": {$gte : parseInt(req.query.st_date)}},  {"create_time": {$lte : parseInt(req.query.ed_date)}}]}
				).toArray( function(err,  payments) {
		  if (err == null) {
			  result = payments;
		  } else {
		    result = err;
		  }
	res.set(
			{ 'Access-Control-Allow-Origin' : req.get('Origin') }
	);
	res.send(result);
	  });
  } else {  
		dbConn.collection('Payment').find().toArray( function(err,  payments) {
		  if (err == null) {
				result = payments;
		  } else {
				result = err;
		  }
	res.set(
			{ 'Access-Control-Allow-Origin' : req.get('Origin') }
	);
	res.send(result);
	  });
  }
}

// Common function
function getCurrTimeMillis() {
	return new Date().getTime();
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
