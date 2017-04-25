import React, { Component } from "react";
import "./Control.css";
import { connect } from "react-redux";
import { vpnConnect, vpnDisconnect } from "./router";

class Control extends Component {
  handleConnect = event => {
    const target = event.target;
    const index = parseInt(target.dataset.index, 10);

    vpnConnect(
      this.props.access.ip,
      this.props.access.username,
      this.props.access.password,
      this.props.connections[index]
    ).catch(error => console.error("Error connecting to VPN", error));
  };

  handleDisconnect = event => {
    vpnDisconnect(
      this.props.access.ip,
      this.props.access.username,
      this.props.access.password
    );
  };

  render() {
    return (
      <div className="Control">
        {this.props.connections.map((item, index) => (
          <button
            key={index}
            type="button"
            data-index={index}
            onClick={this.handleConnect}
          >
            {item.name}
          </button>
        ))}
        <button type="button" onClick={this.handleDisconnect}>
          Disconnect
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    access: state.access,
    connections: state.vpn.connections
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Control);
