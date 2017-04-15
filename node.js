const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/data', function(req, res){
	res.json({
		name: 'Chetan'
	});
});

app.post('/contact-us', function(req, res){
	
});

app.post('/auth/register', function(req, res){
	console.log(req.body.username);
	console.log(req.body.password);
	var token = jwt.sign({ email: req.body.username }, 'shhhhh', { algorithm: 'RS256', expiresIn: '7d' } );
	return res.json(token);
});



// //backdate a jwt 30 seconds 
// var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
 
// // sign with RSA SHA256 
// var cert = fs.readFileSync('private.key');  // get private key 
// var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});
 
// // sign asynchronously 
// jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
//   console.log(token);
// });


app.listen(5000, function () {
  console.log('Listening on port 3000!')
})