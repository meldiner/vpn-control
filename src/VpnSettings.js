import React, { Component } from "react";
import "./VpnSettings.css";
import { connect } from "react-redux";
import {
  ADD_VPN_CONNECTION,
  DELETE_VPN_CONNECTION,
  UPDATE_VPN_CONNECTION
} from "./actions";

class VpnSettings extends Component {
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const index = parseInt(target.dataset.index, 10);

    this.props.handleChange(index, { [name]: value });
  };

  handleAdd = event => {
    const newConnection = {
      name: "",
      server: "",
      username: "",
      password: "",
      protocol: "",
      type: "",
      autoConnect: ""
    };

    this.props.handleAdd(newConnection);
  };

  handleDelete = event => {
    const target = event.target;
    const index = parseInt(target.dataset.index, 10);

    this.props.handleDelete(index);
  };

  render() {
    return (
      <div className="VpnSettings">
        <ul>
          {this.props.vpn.map((item, index) => (
            <li key={index}>
              <label>
                Name:
                {" "}
                <input
                  name="name"
                  type="text"
                  value={item.name}
                  data-index={index}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Server:
                {" "}
                <input
                  name="server"
                  type="text"
                  value={item.server}
                  data-index={index}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Username:
                {" "}
                <input
                  name="username"
                  type="text"
                  value={item.username}
                  data-index={index}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Password:
                {" "}
                <input
                  name="password"
                  type="password"
                  value={item.password}
                  data-index={index}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Protocol:
                {" "}
                <input
                  name="protocol"
                  type="text"
                  value={item.protocol}
                  data-index={index}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Type:
                {" "}
                <input
                  name="type"
                  type="text"
                  value={item.type}
                  data-index={index}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Auto Connect:
                {" "}
                <input
                  name="autoConnect"
                  type="text"
                  value={item.autoConnect}
                  data-index={index}
                  onChange={this.handleChange}
                />
              </label>
              <button
                type="button"
                data-index={index}
                onClick={this.handleDelete}
              >
                -
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={this.handleAdd}>+</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vpn: state.vpn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleAdd: connection =>
      dispatch({
        type: ADD_VPN_CONNECTION,
        connection
      }),
    handleChange: (index, connection) =>
      dispatch({
        type: UPDATE_VPN_CONNECTION,
        index,
        connection
      }),
    handleDelete: index =>
      dispatch({
        type: DELETE_VPN_CONNECTION,
        index
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VpnSettings);
