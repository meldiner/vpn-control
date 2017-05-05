import React from "react";
import { connect } from "react-redux";
import {
  updateRouterAccessSettings,
  loadVpnConnectionsRequest,
  loadVpnConnectionsFailure,
  loadVpnConnectionsSuccess,
  addVpnConnection,
  deleteVpnConnection,
  updateVpnConnection
} from "../actions";
import { fetchVpnConnections } from "../router";
import AccessSettings from "../components/AccessSettings";
import VpnSettings from "../components/VpnSettings";

const Settings = props => (
  <div>
    <AccessSettings {...props.access} {...props.accessDispatches} />
    <br />
    <VpnSettings {...props.vpn} {...props.vpnDispatches} />
  </div>
);

const mapStateToProps = state => {
  return {
    access: state.access,
    vpn: state.vpn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    accessDispatches: {
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
    },
    vpnDispatches: {
      handleAdd: connection => dispatch(addVpnConnection(connection)),
      handleChange: (index, connection) =>
        dispatch(updateVpnConnection(index, connection)),
      handleDelete: index => dispatch(deleteVpnConnection(index))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
