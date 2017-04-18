export const ADD_VPN_CONNECTION = 'ADD_VPN_CONNECTION';
export const addVpnConnection = (connection) => ({
  type: ADD_VPN_CONNECTION,
  connection
});

export const DELETE_VPN_CONNECTION = 'DELETE_VPN_CONNECTION';
export const deleteVpnConnection = (index) => ({
  type: DELETE_VPN_CONNECTION,
  index
});

export const UPDATE_VPN_CONNECTION = 'UPDATE_VPN_CONNECTION';
export const updateVpnConnection = (index, connection) => ({
  type: UPDATE_VPN_CONNECTION,
  index,
  connection
});
