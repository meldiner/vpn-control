import React, { Component } from "react";
import "./Settings.css";
import VpnSettings from "./VpnSettings";
import { connect } from "react-redux";
import {
  updateRouterAccessSettings,
  loadVpnConnectionsRequest,
  loadVpnConnectionsFailure,
  loadVpnConnectionsSuccess
} from "./actions";
import { fetchVpnConnections } from "./router";

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

  handleLoad = event => {
    this.props.handleLoad(
      this.props.ip,
      this.props.username,
      this.props.password
    );
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
        <button type="button" onClick={this.handleLoad}>
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
    ip: state.access.ip,
    username: state.access.username,
    password: state.access.password
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: (key, value) =>
      dispatch(updateRouterAccessSettings(key, value)),
    handleLoad: (ip, username, password) => {
      dispatch(loadVpnConnectionsRequest());

      return fetchVpnConnections(ip, username, password)
        .then(connections => {
          dispatch(loadVpnConnectionsSuccess(connections));
        })
        .catch(error => {
          dispatch(loadVpnConnectionsFailure(error));
        });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
