import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Control from "./containers/Control";
import Settings from "./containers/Settings";
import { BrowserRouter, Link, Route, Redirect } from "react-router-dom";
import Sidebar from "react-sidebar";

class App extends Component {
  render() {
    const sidebarContent = (
      <div>
        <Link to={"/control"}>Control</Link>
        <br />
        <Link to={"/settings"}>Settings</Link>
      </div>
    );

    return (
      <BrowserRouter>
        <Sidebar sidebar={sidebarContent} open={true} docked={true}>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>VPN Control</h2>
            </div>
            <Redirect from="/" to="/control" />
            <Route path="/control" component={Control} />
            <Route path="/settings" component={Settings} />
          </div>
        </Sidebar>
      </BrowserRouter>
    );
  }
}

export default App;
