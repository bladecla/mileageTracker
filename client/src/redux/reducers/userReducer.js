import { LOGIN, AUTHENTICATING, LOGOUT } from './../actions/types';

const initialState = {
  name: "",
  email: "",
  authenticating: false,
  authFailed: false,
  loggedIn: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case AUTHENTICATING:
    console.log("authenticating...")
    return { ...state, authenticating: true, authFailed: false }
  
  case LOGIN:
    console.log("logging in " + payload.name)
    return { ...state, authFailed: false, loggedIn: true, name: payload.name, email: payload.email, authenticating: false }
  
  case LOGOUT:
    console.log(payload ? "redirecting to login..." : "logging out...")
    return payload ? {...initialState, authFailed: true } : {...initialState};

  default:
    return state
  }
}


