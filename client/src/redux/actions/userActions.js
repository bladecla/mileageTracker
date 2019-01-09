import axios from 'axios';
import { cleanTrips, cleanNumbers, success, getCachedUserData, cacheUserData } from './../../helpers';
import { LOGIN, LOGOUT, AUTHENTICATING, SET_TRIPS, SET_VEHICLES} from './../actions/types';

export const setAuthenticating = () => {
  return {
    type: AUTHENTICATING
  }
}

export const checkAuth = () => dispatch => {
  axios.get('api/users')
       .then(({data}) => {
          if (success(data.status, dispatch) && data.success){
            const user = getCachedUserData();
            if (user) dispatchLoginActions(user, dispatch);
          }
       }, err => console.error(err))
}

export const login = credentials => dispatch => {
  console.log("Attempting login")
  dispatch(setAuthenticating());
  axios
  .post('api/users/login', credentials)
  .then(({data}) => handleAuthResponse(data, dispatch, "login successful"), err => console.error(err))
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
    .then(({data}) => handleAuthResponse(data, dispatch, "registration successful"), err => console.error(err))
}

const handleAuthResponse = ({status, user}, dispatch, successLog) => {
  if (success(status, dispatch)){
    if (successLog) console.log(successLog);
    dispatchLoginActions(user, dispatch)
  }
  cacheUserData(user);
}

const dispatchLoginActions = (user, dispatch) => {
  const {name, email, trips, businessMiles, businessTrips, totalMileage, vehicles} = user;
    dispatch({
      type: LOGIN,
      payload: {name, email}
    })
    dispatch({
      type: SET_TRIPS,
      payload: {
        ...cleanNumbers({ totalMileage, businessMiles, businessTrips }),
        trips: cleanTrips(trips)
      }
    })
    dispatch({
      type: SET_VEHICLES,
      payload: vehicles
    })
}