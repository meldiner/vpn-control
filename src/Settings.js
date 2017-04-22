import React, { Component } from "react";
import "./Settings.css";
import VpnSettings from "./VpnSettings";
import { connect } from "react-redux";
import { UPDATE_ROUTER_ACCESS_SETTINGS, LOAD_VPN_CONNECTIONS } from "./actions";
import { getVpnConnections } from "./router";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.props.handleChange(name, value);
  };

  loadVpnConnections = () => {
    getVpnConnections(this.props.ip, this.props.username, this.props.password)
      .then(connections => {
        this.props.handleLoad(connections);
      })
      .catch(error => {
        console.log("Error loading VPN connections", error);
      });
  };

  render() {
    return (
      <div className="Settings">
        <label>
          IP:
          {" "}
          <input
            name="ip"
            type="text"
            value={this.props.ip}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Username:
          {" "}
          <input
            name="username"
            type="text"
            value={this.props.username}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Password:
          {" "}
          <input
            name="password"
            type="password"
            value={this.props.password}
            onChange={this.handleChange}
          />
        </label>
        <button type="button" onClick={this.loadVpnConnections}>
          Load
        </button>
        <br />
        <VpnSettings />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ip: state.ip,
    username: state.username,
    password: state.password
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: (key, value) =>
      dispatch({
        type: UPDATE_ROUTER_ACCESS_SETTINGS,
        key,
        value
      }),
    handleLoad: connections =>
      dispatch({
        type: LOAD_VPN_CONNECTIONS,
        connections
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
