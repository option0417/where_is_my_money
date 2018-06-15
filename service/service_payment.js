module.exports = {
	postPayment : postPayment, 
	getPayment : getPayment,
  editPayment : editPayment
}

const domain = require('../model/payment.js');
const col_payment = 'Payment';

const db = require('../common/db.js');
db.connectToDB();
console.log('Initial done.');

// Post Payment
function postPayment(req, res) {
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
	
	db.getDBConn().collection(col_payment).insertOne(payment,  function(err,   result) {
		if (err == null) {
		  console.log(result);
		} else {
			console.error(err);
		}
	});
  sendResponse(req, res, {pid : payment.payment_id});
}

// Get Payment
function getPayment(req,  res) {
	var queryObject = createQueryObject(req);
	console.log('QueryObject:');
	console.log(queryObject);
	
  var payments;
	db.getDBConn().collection(col_payment).find(queryObject).toArray(
			function(err,  result) {
				if (err == null) {
					payments = result
				} else {
			    console.error(err);
          payments = err;
				}
        sendResponse(req, res, payments);
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

function editPayment(req, res) {
  var paymentID = req.body.payment_id;
  var paymentDescription = req.body.payment_description;

  var payment = buildPaymentFromBody(req.body);

  console.log(JSON.stringify(payment));

  db.getDBConn().collection(col_payment).updateOne(
    {payment_id: paymentID}, 
    {$set: JSON.parse(JSON.stringify(payment))}, 
    function(err, result) {
				if (err == null) {
					console.log(result);
				} else {
			    console.error(err);
				}
    });
  sendResponse(req, res);
}

function buildPaymentFromBody(body) {
  var payment = new domain.Payment;
  
  for (var val in body) {
    console.log(val);
    console.log(body[val]);

    if (body[val] != null) {
     switch (val) {
       case 'payment_id':
         payment.setPaymentID(body[val]);
         break;
       case 'payment_type':
         payment.setPaymentType(body[val]);
         break;
       case 'payment_cost':
         payment.setPaymentCost(body[val]);
         break;
       case 'payment_description':
         payment.setPaymentDescription(body[val]);
         break;
       case 'payment_create_time':
         payment.setPaymentCreateTime(body[val]);
         break;
       case 'payment_update_time':
         payment.setPaymentUpdateTime(body[val]);
         break;
       default:
         break;
     }
    }
  }
  console.log(payment);
  return payment;
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
	console.log('--Show Payment--');
	console.log('\tPayment ID: ' + payment.payment_id);
	console.log('\tPayment Type: ' + payment.payment_type);
	console.log('\tPayment Item: ' + payment.payment_item);
	console.log('\tPayment Cost: ' + payment.payment_cost);
	console.log('\tPayment Description: ' + payment.payment_description);
	console.log('\tCreate Time: ' + payment.create_time);
	console.log('\tUpdate Time: ' + payment.update_time);
}

function sendResponse(req, res, resJson) {
  res.set({'Access-Control-Allow-Origin' : req.get('Origin')});
  res.status(200);

  if (resJson != null) {
    res.json(resJson);
  } else {
    res.send();
  }
}
