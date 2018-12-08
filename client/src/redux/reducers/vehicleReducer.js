import { GET_VEHICLES, ADD_VEHICLE, UPDATE_VEHICLE, DELETE_VEHICLE } from './../actions/types';

const initialState = {
    vehicles: ["Nissan", "Toyota"]
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_VEHICLE:
      return { ...state, ...payload }

    case GET_VEHICLES:
      return state
    
    case UPDATE_VEHICLE: 
    const idx = state.vehicles.indexOf(payload);
    return {
      trips: [...state.vehicles.slice(0, idx), payload, ...state.vehicles.slice(idx + 1) ]
    }

    case DELETE_VEHICLE:
      return {
        vehicles: state.vehicles.filter(vehicle => vehicle !== payload)
      }
    default:
      return state
  }
}