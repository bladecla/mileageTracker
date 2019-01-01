import axios from 'axios';
import { cleanTrips } from './../../helpers';
import { LOGIN, LOGOUT, AUTHENTICATING, SET_TRIPS, SET_VEHICLES} from './../actions/types';

export const setAuthenticating = () => {
  return {
    type: AUTHENTICATING
  }
}

export const login = credentials => dispatch => {
  dispatch(setAuthenticating());
  axios
  .post('api/users/login', credentials)
  .then(res => {
    if (res.data.success){
      const user = res.data.user;
      dispatch({
        type: LOGIN,
        payload: {name: user.name, email: user.email}
      })
      dispatch({
        type: SET_TRIPS,
        payload: {
          trips: cleanTrips(user.trips), 
          businessTrips: +user.businessTrips, 
          businessMiles: +user.businessMiles, 
          totalMileage: +user.totalMileage
        }
      })
      dispatch({
        type: SET_VEHICLES,
        payload: user.vehicles
      })
    }
  })
}

export const logout = () => dispatch => {
  axios.get('api/users/logout').then(res => {
    if (res.data.success) dispatch({
      type: LOGOUT
    })
  })
}