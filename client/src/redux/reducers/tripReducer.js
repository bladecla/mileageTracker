import { ADD_TRIP, GET_TRIPS } from '../actions/types';

const initialState = {
    trips: [
      {
          start: 1000,
          end: 1100,
          isBusiness: false,
          vehicle: "Nissan"
      }, 
      {
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

  default:
    return state
  }
}

