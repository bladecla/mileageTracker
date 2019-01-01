import { LOGIN, AUTHENTICATING, LOGOUT } from './../actions/types';

const initialState = {
  name: "",
  email: "",
  authenticating: false,
  loggedIn: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case AUTHENTICATING:
    return { ...state, authenticating: true }
  
  case LOGIN:
    return { ...state, loggedIn: true, name: payload.name, email: payload.email, authenticating: false }
  
  case LOGOUT:
    console.log("logging out...")
    return initialState;

  default:
    return state
  }
}


