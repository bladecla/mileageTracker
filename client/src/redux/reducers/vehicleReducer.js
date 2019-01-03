import { SET_VEHICLES, ADD_VEHICLE, UPDATE_VEHICLE, DELETE_VEHICLE, LOGOUT } from './../actions/types';

const initialState = {
    vehicles: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_VEHICLES:
      return { vehicles: [...payload] }
      
    case ADD_VEHICLE:
      if (state.vehicles.includes(payload)) return state;
      return { vehicles: [...state.vehicles, payload] }
    
    case UPDATE_VEHICLE: 
      const idx = state.vehicles.indexOf(payload.vehicle);
      return {
        vehicles: [...state.vehicles.slice(0, idx), payload.newVehicle, ...state.vehicles.slice(idx + 1) ]
      }

    case DELETE_VEHICLE:
      return {
        vehicles: state.vehicles.filter(vehicle => vehicle !== payload)
      }

    case LOGOUT:
    return initialState;
      
    default:
      return state
  }
}