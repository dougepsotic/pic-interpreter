// Pic Interpreter
// (c) 2019 Epsotic
// 
// Uploads an image to AWS S3 and displays image recognition labels
// from the AWS Rekognition service accessed via REST API
// 
// Built using React and AWS Amplify. 
// Amplify automatially creates the IAM, S3, API Gateway, and Lambda cloud resources within AWS.
// 
import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';
import { withAuthenticator, S3Image } from 'aws-amplify-react';
import aws_exports from './aws-exports';
import './App.css';
Amplify.configure(aws_exports); 

const MyTheme = {
  photoPlaceholder: { 'display': 'none' }
}

var firstTime = true;

function fileToKey(data) {
  const randomInt = Math.floor(Math.random() * (100000 - 1 + 1)) + 1;
  return randomInt + "-" + data.name;
}

function InterpretPic(picUrl) {
  var picLabels;
  if (firstTime) {
    firstTime = false
  } else {
    let apiName = "rekognize";
    let path = "/interpret"; 
    let myInit = { 
      queryStringParameters: { url: picUrl }
    }
    API.get(apiName, path, myInit).then(response => {
      picLabels = response.data;
      // Object.keys(response.data).forEach(function(attribute) {
          // {attribute}: {response.data[attribute]}
      // });
    }).catch(error => { console.log(error) });
  }
  return picLabels;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to Pic Interpreter!</h1>
        <h2>Upload a picture to learn about its attributes</h2>
        <S3Image theme={MyTheme} fileToKey={fileToKey} picker 
          onLoad={ url => this.InterpretPic(url) } />
        <div>Here's what we noticed about your picture:</div>
      </div>
    );
  }
}

export default withAuthenticator(App,{includeGreetings: true});