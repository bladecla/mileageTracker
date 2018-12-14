import { ADD_TRIP, GET_TRIPS, DELETE_TRIP, UPDATE_TRIP } from './types';

export const getTrips = () => {
    return {
        type: GET_TRIPS
    }
}

export const addTrip = trip => {
    return {
        type: ADD_TRIP,
        payload: trip
    }
}

export const updateTrip = newTrip => {
    return {
        type: UPDATE_TRIP,
        payload: newTrip
    }
}

export const deleteTrip = tripData => {
    return {
        type: DELETE_TRIP,
        payload: tripData
    }
}