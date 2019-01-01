import { GET_VEHICLES, SET_VEHICLES, ADD_VEHICLE, UPDATE_VEHICLE, DELETE_VEHICLE, LOGOUT } from './../actions/types';

const initialState = {
    vehicles: ["Nissan", "Toyota"]
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_VEHICLE:
      return { vehicles: [...state.vehicles, payload] }

    case GET_VEHICLES:
      return state
    
    case SET_VEHICLES:
      return { vehicles: [...payload] }
    
    case UPDATE_VEHICLE: 
      const idx = state.vehicles.indexOf(payload);
      return {
        vehicles: [...state.vehicles.slice(0, idx), payload, ...state.vehicles.slice(idx + 1) ]
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