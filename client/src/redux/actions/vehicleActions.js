import axios from 'axios';
import { GET_VEHICLES, ADD_VEHICLE, UPDATE_VEHICLE, DELETE_VEHICLE } from './../actions/types';
import { success } from './../../helpers';

export const addVehicle = vehicle => dispatch => {
  axios
    .post('api/vehicles', vehicle)
    .then(({data}) => {
      if (success(data.status, dispatch)){
        dispatch({
          type: ADD_VEHICLE,
          payload: vehicle
        })
      }
    }, err => console.error(err))
}

export const updateVehicle = (vehicle, newVehicle) => dispatch => {
  axios
    .put('api/vehicles', {vehicle, newVehicle})
    .then(({data}) => {
      if (success(data.status, dispatch)){
        dispatch({
          type: UPDATE_VEHICLE,
          payload: { vehicle, newVehicle }
        })
      }
    })
}

export const deleteVehicle = vehicle => {
  return {
    type: DELETE_VEHICLE,
    payload: vehicle
  }
}