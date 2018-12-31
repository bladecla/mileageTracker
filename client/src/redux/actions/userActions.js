import axios from 'axios';
import { LOGIN, AUTHENTICATING, SET_TRIPS, SET_VEHICLES} from './../actions/types';

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
            trips: user.trips, 
            businessTrips: user.businessTrips, 
            businessMiles: user.businessMiles, 
            totalMileage: user.totalMileage
          }
        })
        dispatch({
          type: SET_VEHICLES,
          payload: {vehicles: user.vehicles}
        })
      }
    })
}