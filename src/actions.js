export const UPDATE_ROUTER_ACCESS_SETTINGS = "UPDATE_ROUTER_ACCESS_SETTINGS";
export const updateRouterAccessSettings = (key, value) => ({
  type: UPDATE_ROUTER_ACCESS_SETTINGS,
  key,
  value
});

export const LOAD_VPN_CONNECTIONS_REQUEST = "LOAD_VPN_CONNECTIONS_REQUEST";
export const loadVpnConnectionsRequest = () => ({
  type: LOAD_VPN_CONNECTIONS_REQUEST
});

export const LOAD_VPN_CONNECTIONS_FAILURE = "LOAD_VPN_CONNECTIONS_FAILURE";
export const loadVpnConnectionsFailure = error => ({
  type: LOAD_VPN_CONNECTIONS_FAILURE,
  error
});

export const LOAD_VPN_CONNECTIONS_SUCCESS = "LOAD_VPN_CONNECTIONS_SUCCESS";
export const loadVpnConnectionsSuccess = connections => ({
  type: LOAD_VPN_CONNECTIONS_SUCCESS,
  connections
});

export const ADD_VPN_CONNECTION = "ADD_VPN_CONNECTION";
export const DELETE_VPN_CONNECTION = "DELETE_VPN_CONNECTION";
export const UPDATE_VPN_CONNECTION = "UPDATE_VPN_CONNECTION";
