import React, { Component } from 'react';
import './Settings.css';
import VpnSettings from './VpnSettings';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      ip: '',
      username: '',
      password: ''
    }
  };

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form className="Settings" onSubmit={this.handleSubmit}>
        <label>
          IP: <input name="ip" type="text" value={this.state.ip} onChange={this.handleChange} />
        </label>
        <label>
          Username: <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          Password: <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <br />
        <VpnSettings />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default Settings;
