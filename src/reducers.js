import { combineReducers } from "redux";
import {
  UPDATE_ROUTER_ACCESS_SETTINGS,
  LOAD_VPN_CONNECTIONS_REQUEST,
  LOAD_VPN_CONNECTIONS_SUCCESS,
  LOAD_VPN_CONNECTIONS_ERROR,
  ADD_VPN_CONNECTION,
  DELETE_VPN_CONNECTION,
  UPDATE_VPN_CONNECTION
} from "./actions";

const initialAccessState = {
  ip: "",
  username: "",
  password: ""
};

const accessSettingsReducer = (state = initialAccessState, action) => {
  let newState;

  switch (action.type) {
    case UPDATE_ROUTER_ACCESS_SETTINGS:
      newState = { ...state, [action.key]: action.value };
      return newState;
    default:
      return state;
  }
};

const initialVpnState = {
  status: "",
  connections: []
};

const vpnSettingsReducer = (state = initialVpnState, action) => {
  switch (action.type) {
    case LOAD_VPN_CONNECTIONS_REQUEST:
      return state;
    case LOAD_VPN_CONNECTIONS_SUCCESS:
      return { ...state, connections: action.connections };
    case LOAD_VPN_CONNECTIONS_ERROR:
      //TODO: handle error
      return state;
    case ADD_VPN_CONNECTION:
      return {
        ...state,
        connections: [...state.connections, action.connection]
      };
    case DELETE_VPN_CONNECTION:
      return {
        ...state,
        connections: [
          ...state.connections.slice(0, action.index),
          ...state.connections.slice(action.index + 1)
        ]
      };
    case UPDATE_VPN_CONNECTION:
      return {
        ...state,
        connections: [
          ...state.connections.slice(0, action.index),
          { ...state.connections[action.index], ...action.connection },
          ...state.connections.slice(action.index + 1)
        ]
      };
    default:
      return state;
  }
};

export default combineReducers({
  access: accessSettingsReducer,
  vpn: vpnSettingsReducer
});
