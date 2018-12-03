import { ADD_TRIP, GET_TRIPS, DELETE_TRIP } from '../actions/types';
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
  switch (type) {

  case ADD_TRIP:
    return {
        trips: [ ...state.trips, payload ]
    }

  case GET_TRIPS:
    return {
        ...state
    }

  case DELETE_TRIP:
    return {
      trips: state.trips.filter(trip => trip._id !== payload)
    }

  default:
    return state
  }
}

