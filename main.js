const express = require('express');
const api = express();
const bodyParser= require('body-parser')

api.use(bodyParser.urlencoded({extended: true}))

api.get('/record', function (req, res) {
	res.set(
		{
			'Access-Control-Allow-Origin' : req.get('Origin')
		}
	);

  res.send('Hello World!')
});

api.post('/record', function(req, res) {
  console.log(req.body)
});

api.options('/record',  function(req,  res) {
	console.log(req);
	res.set(
		{
			'Access-Control-Allow-Origin' : '*'
		}
	);
	res.sendStatus(200);
})

api.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
