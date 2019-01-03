import axios from 'axios';
import { ADD_VEHICLE, UPDATE_VEHICLE, DELETE_VEHICLE } from './../actions/types';
import { success } from './../../helpers';

export const addVehicle = vehicle => dispatch => {
  axios
    .post('api/vehicles', {vehicle})
    .then(({data}) => {
      if (success(data.status, dispatch)){
        dispatch({
          type: ADD_VEHICLE,
          payload: data.vehicle
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
          payload: { vehicle: data.vehicle, newVehicle }
        })
      } 
    }, err => console.error(err))
}

export const deleteVehicle = vehicle => dispatch => {
  axios
    .delete('api/vehicles' + vehicle)
    .then(({data}) => {
      if (success(data.status, dispatch)){
        dispatch({
          type: DELETE_VEHICLE,
          payload: data.vehicle
        })
      }
    }, err => console.error(err))
}