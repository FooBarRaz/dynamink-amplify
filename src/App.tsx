import React from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';
// Get the aws resources configuration parameters
import awsconfig from './aws-exports'
import { Link } from 'react-router-dom';
Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to Dyamink</h1>
        <p>
          Click the button below to start creating your target sites
        </p>
        <Link
          className="App-link"
          to="/create"
        >
          Login
        </Link>
      </header>
    </div>
  );
}

export default App
