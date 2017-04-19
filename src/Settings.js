import React, { Component } from "react";
import "./Settings.css";
import VpnSettings from "./VpnSettings";
import { connect } from "react-redux";
import { UPDATE_ROUTER_ACCESS_SETTINGS } from "./actions";

class Settings extends Component {
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.props.handleChange(name, value);
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
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
