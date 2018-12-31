import { LOGIN, AUTHENTICATING } from './../actions/types';

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

  default:
    return state
  }
}


