const express = require('express');
const api = express();

// HTTP Body parser
const bodyParser= require('body-parser');
// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({extended: true}));
// parse application/json 
api.use(bodyParser.json());

// Model
const mPayment = require('./model/payment.js');


api.post('/record', function(req, res) {
	console.log('do post');
  showReq(req);

	var payment = new mPayment.Payment(123, req.body.item_type, req.body.item_name, req.body.item_price, req.body.item_amount, req.body.total_cost);
	showPayment(payment);

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
  res.send('Hello World!')
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
  console.log('Show header');
	console.log(req.headers);
	console.log('Show body');
	console.log(req.body);
}

function showPayment(payment) {
  console.log('Show Payment');
	console.log(payment.payment_id);
	console.log(payment.payment_type);
	console.log(payment.item_name);
	console.log(payment.item_price);
	console.log(payment.amount);
	console.log(payment.total_cost);
}
