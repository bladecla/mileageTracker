import { ADD_TRIP, GET_TRIPS } from './types';

export const addTrip = (trip) => {
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