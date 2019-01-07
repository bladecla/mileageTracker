import axios from 'axios';
import { cleanTrips, success } from './../../helpers';
import { LOGIN, LOGOUT, AUTHENTICATING, SET_TRIPS, SET_VEHICLES} from './../actions/types';

export const setAuthenticating = () => {
  return {
    type: AUTHENTICATING
  }
}

export const login = (credentials, shouldAuthenticate = true) => dispatch => {
  console.log("Attempting login")
  dispatch(setAuthenticating());
  axios
  .post(`api/users/${shouldAuthenticate ? "login" : ""}`, credentials)
  .then(({data}) => dispatchLoginActions(data, dispatch, "login successful"), err => console.error(err))
}

export const logout = () => dispatch => {
  axios.get('api/users/logout').then(res => {
    if (res.data.success) dispatch({
      type: LOGOUT,
      payload: false
    })
  })
}

export const register = credentials => dispatch => {
  dispatch(setAuthenticating());
  axios
    .post('api/users/register', credentials)
    .then(({data}) => dispatchLoginActions(data, dispatch, "registration successful"))
}

const dispatchLoginActions = (data, dispatch, successLog) => {
  if (success(data.status, dispatch)){
    if (successLog) console.log(successLog);
    const {name, email, trips, businessMiles, businessTrips, totalMileage, vehicles} = data.user;
    dispatch({
      type: LOGIN,
      payload: {name, email}
    })
    dispatch({
      type: SET_TRIPS,
      payload: {
        trips: cleanTrips(trips), 
        businessTrips: +businessTrips, 
        businessMiles: +businessMiles, 
        totalMileage: +totalMileage
      }
    })
    dispatch({
      type: SET_VEHICLES,
      payload: vehicles
    })
  }
}