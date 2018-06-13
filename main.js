const express = require('express');
const api = express();
const cors = require('cors');
const service = require('./service/service_payment.js');
const api_payment = require('./api/api_payment');
var common = require('./common/common.js')


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


api.post('/record', api_payment.postPayment);

api.get('/record', api_payment.getPayment);

api.put('/record', api_payment.editPayment);

api.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

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

