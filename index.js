const express = require('express');
const api = express();
const bodyParser= require('body-parser')

api.use(bodyParser.urlencoded({extended: true}))

api.get('/record', function (req, res) {
  res.send('Hello World!')
});

api.post('/record', function(req, res) {
  console.log(req.body)
});

api.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
