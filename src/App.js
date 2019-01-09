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

function fileToKey(data) {
  const randomInt = Math.floor(Math.random() * (100000 - 1 + 1)) + 1;
  return randomInt + "-" + data.name;
}

class PicInterpretation extends Component {

  constructor(props) {
    super(props);
    this.state = {attributes: []};
  }

  componentDidMount() {
    let apiName = "rekognize";
    let path = "/interpret"; 
    let myInit = { 
      queryStringParameters: { url: this.props.picUrl }
    }
    API.get(apiName, path, myInit)
      .then(output => {
        let labelList = Object.keys(output.data).map(attribute => {
          return (
            <li key={attribute}>
              {attribute}: {output.data[attribute]}
            </li>
          )
        })
        this.setState({attributes: labelList});
      })
      .catch(error => { console.log(error) });
  }

  render () {
    return (
      <div>
        <h3>Here's what we noticed about your picture:</h3>
        <ul style={{ listStyleType: "none" }}>{this.state.attributes}</ul>    
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {picUrl: ""};
  }
   
  render() {
    return (
      <div className="App">
        <h1>Welcome to Pic Interpreter!</h1>
        <h2>Upload a picture to learn about its attributes</h2>
        {this.state.picUrl.startsWith("http") &&
          <PicInterpretation picUrl={this.state.picUrl} />
        }
        <S3Image theme={MyTheme} fileToKey={fileToKey} picker 
          onLoad={ url => {this.setState({picUrl: url})} }/>
      </div>
    );
  }
}

export default withAuthenticator(App,{includeGreetings: true});