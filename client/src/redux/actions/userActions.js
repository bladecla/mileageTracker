import axios from 'axios';
import { cleanTrips, success } from './../../helpers';
import { LOGIN, LOGOUT, AUTHENTICATING, SET_TRIPS, SET_VEHICLES} from './../actions/types';

export const setAuthenticating = () => {
  return {
    type: AUTHENTICATING
  }
}

export const login = credentials => dispatch => {
  console.log("Attempting login")
  dispatch(setAuthenticating());
  axios
  .post('api/users/login', credentials)
  .then(({data}) => {
    if (success(data.status)){
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
  }, err => console.error(err))
}

export const logout = () => dispatch => {
  axios.get('api/users/logout').then(res => {
    if (res.data.success) dispatch({
      type: LOGOUT
    })
  })
}

export const register = () => dispatch => {
  
}