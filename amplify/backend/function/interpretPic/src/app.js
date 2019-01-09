// Pic Interpreter - Lambda Function
// (c) 2019 Epsotic

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

// Setup AWS SDK

const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})

// GET Method

app.get('/interpret', function(req, res) {

  var rekognition = new AWS.Rekognition()

  var params = {
    Image: {
     S3Object: {
      Bucket: req.apiGateway.event.queryStringParameters.bucket, 
      Name: req.apiGateway.event.queryStringParameters.name
      // Bucket: "picinterpreter3b990ca2d6a3479093294b2a22c5d994", 
      // Name: "public/11067-aws-cloud-marketshare.jpg"
      }
    }, 
    MaxLabels: 50, 
    MinConfidence: 80
  };
  
  rekognition.detectLabels(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else {
      console.log(data);
      res.json({success: 'Rekognize successful!', url: req.url, data: data});
    }
  });
});

app.get('/interpret/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/interpret', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/interpret/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example post method *
****************************/

app.put('/interpret', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/interpret/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/interpret', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/interpret/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app