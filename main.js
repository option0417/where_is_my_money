const express = require('express');
const api = express();
const cors = require('cors');
const service = require('./service/payment_service.js');


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


api.post('/record', function(req, res) {
	console.log('do post');
  showReq(req);

	service.postPayment(req);

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

  service.getPayment(req, res);
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


// Shutdown hook
process.on('exit', function() {
  console.log('WIMM Exit');
});

process.on('SIGTERM',  function () {
  console.log('WIMM SIGTERM');
	process.exit(1);
});

process.on('SIGINT',  function () {
  console.log('WIMM SIGINT');
	process.exit(1);
});

