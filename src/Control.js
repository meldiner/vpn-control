import React, { Component } from "react";
import "./Control.css";
import { connect } from "react-redux";
import { vpnConnect } from "./router";

class Control extends Component {
  handleClick = event => {
    const target = event.target;
    const index = parseInt(target.dataset.index, 10);

    vpnConnect(
      this.props.access.ip,
      this.props.access.username,
      this.props.access.password,
      this.props.connections[index]
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
            onClick={this.handleClick}
          >
            {item.name}
          </button>
        ))}
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
