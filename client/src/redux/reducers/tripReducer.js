import { ADD_TRIP, GET_TRIPS, DELETE_TRIP, UPDATE_TRIP } from '../actions/types';
import uuid from 'uuid';
const initialState = {
    trips: [
      {
          _id: uuid(),
          start: 1000,
          end: 1100,
          isBusiness: false,
          vehicle: "Nissan"
      }, 
      {   
          _id: uuid(),
          start: 1100,
          end: 1170,
          isBusiness: true,
          date: new Date()
      }
    ]
}

export default function (state = initialState, { type, payload }){
  console.log("dispatched")
  switch (type) {

  case GET_TRIPS:
    return {
        ...state
    }
    
  case ADD_TRIP:
    return {
        trips: [ ...state.trips, payload ]
    }

  case UPDATE_TRIP:
    let trip = state.trips.filter(trp => trp._id === payload._id)[0];
    let newTrip = Object.assign({...trip}, payload);
    const idx = state.trips.indexOf(trip);
    return {
      trips: [...state.trips.slice(0, idx), newTrip, ...state.trips.slice(idx + 1) ]
    };

  case DELETE_TRIP:
    return {
      trips: state.trips.filter(trip => trip._id !== payload)
    }

  default:
    return state
  }
}

