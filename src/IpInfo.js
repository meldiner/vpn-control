import React, { Component } from 'react';
import './IpInfo.css';

const REFRESH_MESSAGE = 'Refreshing IP Information...';

class IpInfo extends Component {
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);

    this.state = {
      message: REFRESH_MESSAGE
    };
  }

  componentDidMount() {
    this.refresh();    
  }

  refresh() {
    this.setState((prevState, props) => ({ 
      message: REFRESH_MESSAGE
    }));

    fetch('http://ipinfo.io/json')
      .then(response => response.json())
      .then(response => {
        this.setState((prevState, props) => ({ 
          message: JSON.stringify(response, null, 2)
        }));
      })
      .catch(error => {
        this.setState((prevState, props) => ({ 
          message: `Error: ${error.message}`
        }));
      });
  }

  render() {
    return (
      <div className="IpInfo">
        <div className="Message">{this.state.message}</div>
        <button type="button" onClick={this.refresh}>Refresh</button>
      </div>
    );
  }
}

export default IpInfo;
