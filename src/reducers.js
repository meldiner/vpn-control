import {
  UPDATE_ROUTER_ACCESS_SETTINGS,
  ADD_VPN_CONNECTION,
  DELETE_VPN_CONNECTION,
  UPDATE_VPN_CONNECTION
} from "./actions";

const initialState = {
  ip: "",
  username: "",
  password: "",
  vpn: []
};

const rootReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case UPDATE_ROUTER_ACCESS_SETTINGS:
      newState = { ...state, [action.key]: action.value };
      return newState;
    case ADD_VPN_CONNECTION:
      newState = { ...state };
      newState.vpn = [...state.vpn, action.connection];
      return newState;
    case DELETE_VPN_CONNECTION:
      newState = { ...state };
      newState.vpn = [
        ...state.vpn.slice(0, action.index),
        ...state.vpn.slice(action.index + 1)
      ];
      return newState;
    case UPDATE_VPN_CONNECTION:
      newState = { ...state };
      newState.vpn = [
        ...state.vpn.slice(0, action.index),
        { ...state.vpn[action.index], ...action.connection },
        ...state.vpn.slice(action.index + 1)
      ];
      return newState;
    default:
      return state;
  }
};

export default rootReducer;
