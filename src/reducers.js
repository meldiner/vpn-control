import { ADD_VPN_CONNECTION, DELETE_VPN_CONNECTION, UPDATE_VPN_CONNECTION } from './actions'

const rootReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_VPN_CONNECTION:
      return [
        ...state,
        action.connection
      ]
    case DELETE_VPN_CONNECTION:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    case UPDATE_VPN_CONNECTION:
      return state.map((connection, index) => {
        if(index !== action.index) {
          return connection;
        }
        else {
          return Object.assign(connection, action.connection);
        }
      });
    default:
      return state;
  }
}

export default rootReducer;
