import { ADD_TRIP, GET_TRIPS, SET_TRIPS, DELETE_TRIP, UPDATE_TRIP, LOGOUT, DELETE_VEHICLE, UPDATE_VEHICLE, SELECT_TRIP, BATCH_UPDATE_TRIP, BATCH_DELETE_TRIP, RESET, SELECT_ALL, DESELECT_ALL } from '../actions/types'

const initialState = {
    trips: [],
    selected: [],
    totalMileage: 0,
    businessMiles: 0,
    businessTrips: 0
}

export default function (state = initialState, { type, payload }){
  switch (type) {
    case ADD_TRIP:
      const {trip, totalMileage, businessMiles, businessTrips} = payload;
      return {
        ...state,
        trips: [ trip, ...state.trips ],
        totalMileage,
        businessMiles,
        businessTrips
    }
    
    case GET_TRIPS:
      return state

    case SET_TRIPS:
      return {...state, ...payload}

    case SELECT_TRIP:
      return state.selected.find(trip => trip._id === payload._id)
        ? { ...state, selected: state.selected.filter(trip => trip._id !== payload._id) }
        : { ...state, selected: [...state.selected, payload] }

    case SELECT_ALL:
      const selection = state.trips.length !== state.selected.length
        ? [...state.trips]
        : [];
      return {...state, selected: selection}

    case DESELECT_ALL: 
      return {...state, selected: []}

    case UPDATE_TRIP:
      const { newTrip } = payload;
      const currTrip = state.trips.find(trp => trp._id === newTrip._id);
      const idx = state.trips.indexOf(currTrip);
      return {
        ...state,
        trips: [...state.trips.slice(0, idx), newTrip, ...state.trips.slice(idx + 1) ],
        totalMileage: payload.totalMileage,
        businessMiles: payload.businessMiles,
        businessTrips: payload.businessTrips
      }

    case DELETE_TRIP:
      const { _id } = payload;
      return {
        ...state,
        trips: state.trips.filter(trip => trip._id !== _id),
        selected: state.selected.filter(trip => trip._id !== _id),
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
      
    case UPDATE_VEHICLE:
      const { vehicle, newVehicle } = payload;
      return {
        ...state,
        trips: state.trips.map(trip => {
          if (trip.vehicle !== vehicle) return trip;
          trip.vehicle = newVehicle;
          return trip;
        })
      }

    case BATCH_UPDATE_TRIP:
      let updatedTrips = [...state.trips];
      payload.trips.forEach(trip => {
        const idx = updatedTrips.findIndex(elem => elem._id === trip._id);
        updatedTrips[idx] = trip;
      })
      return {
        ...state,
        trips: updatedTrips,
        totalMileage: payload.totalMileage,
        businessMiles: payload.businessMiles,
        businessTrips: payload.businessTrips
        
      };

    case BATCH_DELETE_TRIP:
      return {
        ...state,
        trips: state.trips.filter(trip => !payload.trips.includes(trip._id)),
        selected: state.selected.filter(trip => !payload.trips.includes(trip._id)),
        totalMileage: payload.totalMileage,
        businessMiles: payload.businessMiles,
        businessTrips: payload.businessTrips
      }

    case LOGOUT:
      return initialState;
    
    case RESET:
      return initialState;
      
    default:
      return state
  }
}

