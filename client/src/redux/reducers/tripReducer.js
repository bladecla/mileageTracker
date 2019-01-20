import { ADD_TRIP, GET_TRIPS, SET_TRIPS, DELETE_TRIP, UPDATE_TRIP, LOGOUT, DELETE_VEHICLE } from '../actions/types'

const initialState = {
    trips: [],
    totalMileage: 0,
    businessMiles: 0,
    businessTrips: 0
}

export default function (state = initialState, { type, payload }){
  switch (type) {
    case ADD_TRIP:
      const {trip, totalMileage, businessMiles, businessTrips} = payload;
      return {
        trips: [ trip, ...state.trips ],
        totalMileage,
        businessMiles,
        businessTrips
    }
    
    case GET_TRIPS:
      return state

    case SET_TRIPS:
      return {...payload}

    case UPDATE_TRIP:
      const { newTrip } = payload;
      const currTrip = state.trips.filter(trp => trp._id === newTrip._id)[0];
      const idx = state.trips.indexOf(currTrip);
      return {
        trips: [...state.trips.slice(0, idx), newTrip, ...state.trips.slice(idx + 1) ],
        totalMileage: payload.totalMileage,
        businessMiles: payload.businessMiles,
        businessTrips: payload.businessTrips
      }

    case DELETE_TRIP:
      const { _id } = payload;
      return {
        trips: state.trips.filter(trip => trip._id !== _id),
        totalMileage: payload.totalMileage,
        businessMiles: payload.businessMiles,
        businessTrips: payload.businessTrips
      }
    
    case DELETE_VEHICLE:
      return {
        ...state,
        trips: state.trips.map(trip => {
          if (trip.vehicle !== payload) return trip;
          delete trip.vehicle;
          return trip;
        })
      }

    case LOGOUT:
    return initialState;

    default:
      return state
  }
}

