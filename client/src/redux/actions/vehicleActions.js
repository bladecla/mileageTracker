import { GET_VEHICLES, ADD_VEHICLE, UPDATE_VEHICLE, DELETE_VEHICLE } from './../actions/types';

export const addVehicle = (vehicle) => {
  return {
    type: ADD_VEHICLE,
    payload: vehicle
  }
}

export const getVehicles = () => {
  return {
    type: GET_VEHICLES
  }
}

export const updateVehicle = (vehicle) => {
  return {
    type: UPDATE_VEHICLE,
    payload: vehicle
  }
}

export const deleteVehicle = (vehicle) => {
  return {
    type: DELETE_VEHICLE,
    payload: vehicle
  }
}