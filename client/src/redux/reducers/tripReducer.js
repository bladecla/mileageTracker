import { ADD_TRIP, GET_TRIPS } from '../actions/types';

const initialState = {
    trips: [
        {
        start: 1000,
        end: 1100,
        forBusiness: false,
        vehicle: "Nissan"
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

