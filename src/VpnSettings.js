import React, { Component } from 'react';
import './VpnSettings.css';
import { connect } from 'react-redux';
import { addVpnConnection, deleteVpnConnection, updateVpnConnection } from './actions';

class VpnSettings extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event, index) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.handleChange(index, {[name]: value});
  }

  handleAdd(event) {
    const newConnection = {
      name: '',
      server: '',
      username: '',
      password: '',
      protocol: '',
      type: '',
      autoConnect: ''
    };

    this.props.handleAdd(newConnection);
  }

  handleDelete(event, index) {
    this.props.handleDelete(index);
  }

  render() {
    return (
      <div className="VpnSettings">
        <ul>
          {
            this.props.vpn.map((item, index) => (
              <li key={index}>
                <label>
                  Name: <input name="name" type="text" value={item.name} onChange={event => this.handleChange(event, index)} />
                </label>
                <label>
                  Server: <input name="server" type="text" value={item.server} onChange={event => this.handleChange(event, index)} />
                </label>
                <label>
                  Username: <input name="username" type="text" value={item.username} onChange={event => this.handleChange(event, index)} />
                </label>
                <label>
                  Password: <input name="password" type="password" value={item.password} onChange={event => this.handleChange(event, index)} />
                </label>
                <label>
                  Protocol: <input name="protocol" type="text" value={item.protocol} onChange={event => this.handleChange(event, index)} />
                </label>
                <label>
                  Type: <input name="type" type="text" value={item.type} onChange={event => this.handleChange(event, index)} />
                </label>
                <label>
                  Auto Connect: <input name="autoConnect" type="text" value={item.autoConnect} onChange={event => this.handleChange(event, index)} />
                </label>
                <button type="button" onClick={event => this.handleDelete(event, index)}>-</button>
              </li>
            ))
          }
        </ul>
        <button type="button" onClick={this.handleAdd}>+</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vpn: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAdd: (connection) => {
      dispatch(addVpnConnection(connection));
    },
    handleChange: (index, connection) => {
      dispatch(updateVpnConnection(index, connection))
    },
    handleDelete: (index) => {
      dispatch(deleteVpnConnection(index))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VpnSettings);
