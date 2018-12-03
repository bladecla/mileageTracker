import { ADD_TRIP, GET_TRIPS, DELETE_TRIP } from './types';

export const addTrip = trip => {
    return {
        type: ADD_TRIP,
        payload: trip
    }
}

export const getTrips = () => {
    return {
        type: GET_TRIPS
    }
}

export const deleteTrip = id => {
    return {
        type: DELETE_TRIP,
        payload: id
    }
}