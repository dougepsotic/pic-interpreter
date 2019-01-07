// Pic Interpreter
// (c) 2019 Epsotic
// 
// A protoype that uploads an image to AWS S3 and displays image recognition labels
// from the AWS Rekognition service
// 
// Built using React and AWS Amplify
// 
// TODO
// Randomize S3 filenames
// 
import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator, S3Image } from 'aws-amplify-react';
import aws_exports from './aws-exports';
import './App.css';
Amplify.configure(aws_exports); 

const MyTheme = {
  photoPlaceholder: { 'display': 'none' }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to Pic Interpreter!</h1>
        <h2>Upload a picture to learn about its attributes</h2>
        <S3Image theme={MyTheme} path="pictures/" picker />
      </div>
    );
  }
}

export default withAuthenticator(App,{includeGreetings: true});