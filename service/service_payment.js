module.exports = {
	postPayment : postPayment, 
	getPayment : getPayment
}

const domain = require('../model/payment.js');
const dbConn = require('../common/db.js').connectToDB();
console.log(dbConn);
// Setup connection for MongoDB
//var url = 'mongodb://localhost:27017/db_wimm';
//var dbConn;
//require('mongodb').MongoClient.connect(
//		url, 
//    {poolSize : 5}, 
//    function(err,   db) {
//			if (err == null) {
//				console.log("Connected successfully to db");
//				dbConn = db;
//				console.log(dbConn);

        // Setup logger for MongoDB
//        require('mongodb').Logger.setLevel("info");
//			} else {
//				console.error(err);
//			}
//		}
//);

// Post Payment
function postPayment(req) {
	var currTime = getCurrTimeMillis();
	var payment = new domain.Payment(
			createPaymentID() + '-' + currTime, 
			req.body.payment_type, 
			req.body.payment_item, 
			req.body.payment_cost,  
			req.body.payment_description,  
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
	var queryObject = createQueryObject(req);
	console.log('QueryObject:');
	console.log(queryObject);
	
	dbConn.collection('Payment').find(queryObject).toArray(
			function(err,  payments) {
				if (err == null) {
					result = payments;
				} else {
					result = err;
				}
				res.send(result);
		});
}

function createQueryObject(req) {
	var queryObject = {};
	if (req.query.tp != null) {
		queryObject.payment_type = req.query.tp;
	}

	if (req.query.st_date != null && req.query.ed_date != null) {
		queryObject.$and = [{"create_time": {$gte : parseInt(req.query.st_date)}},  {"create_time": {$lte : parseInt(req.query.ed_date)}}];
	}
	return queryObject;
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
	console.log('Payment Item: ' + payment.payment_item);
	console.log('Payment Cost: ' + payment.payment_cost);
	console.log('Payment Description: ' + payment.payment_description);
	console.log('Create Time: ' + payment.create_time);
	console.log('Update Time: ' + payment.update_time);
}
