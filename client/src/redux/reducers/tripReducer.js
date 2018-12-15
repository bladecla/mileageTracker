import { ADD_TRIP, GET_TRIPS, DELETE_TRIP, UPDATE_TRIP } from '../actions/types'
import uuid from 'uuid'
import { stat } from 'fs';
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
    ],
    totalMileage: 170,
    businessMiles: 70,
    businessTrips: 1
}

export default function (state = initialState, { type, payload }){
  switch (type) {
    
    case ADD_TRIP:
      const dist = payload.end - payload.start;
      return {
        trips: [ ...state.trips, payload ],
        totalMileage: state.totalMileage + dist,
        businessMiles: payload.isBusiness ? state.businessMiles + dist : state.businessMiles,
        businessTrips: payload.isBusiness ? state.businessTrips + 1 : state.businessTrips,
    }
    
    case GET_TRIPS:
      return state

    case UPDATE_TRIP:
      const { businessMiles: bMiles, businessTrips: bTrips } = state;
      const currTrip = state.trips.filter(trp => trp._id === payload._id)[0];
      const idx = state.trips.indexOf(currTrip);
      const newTrip = Object.assign({...currTrip}, payload);
      const currTripDist = currTrip.end - currTrip.start;
      const newTripDist = newTrip.end - newTrip.start;
      const distChange = newTripDist - currTripDist;
      const currIB = currTrip.isBusiness;
      const newIB = newTrip.isBusiness;
      const nowBusiness = !currIB && newIB;
      const calculateBusinessMiles = () => {
        if (currIB && newIB) return bMiles + distChange;
        if (currIB && !newIB) return bMiles - currTripDist;
        if (nowBusiness) return bMiles + newTripDist;
        return bMiles;
      };
      return {
        trips: [...state.trips.slice(0, idx), newTrip, ...state.trips.slice(idx + 1) ],
        totalMileage: state.totalMileage + distChange,
        businessMiles: calculateBusinessMiles(),
        businessTrips: currIB === newIB ? bTrips : nowBusiness ? bTrips + 1 : bTrips - 1
      }

    case DELETE_TRIP:
      return {
        trips: state.trips.filter(trip => trip._id !== payload._id),
        totalMileage: state.totalMileage - payload.dist,
        businessMiles: payload.isBusiness ? state.businessMiles - payload.dist : state.businessMiles,
        businessTrips: payload.isBusiness ? state.businessTrips - 1 : state.businessTrips,
      }

    default:
      return state
  }
}

