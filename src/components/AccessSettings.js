import React, { Component } from "react";
import "./AccessSettings.css";

class AccessSettings extends Component {
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
      <div className="AccessSettings">
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
      </div>
    );
  }
}

export default AccessSettings;
