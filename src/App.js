import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IpInfo from './IpInfo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>VPN Control</h2>
        </div>
        <IpInfo />
      </div>
    );
  }
}

export default App;
