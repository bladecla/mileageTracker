import axios from 'axios';
import { cleanTrips } from './../../helpers';
import { SET_TRIPS, GET_TRIPS, DELETE_TRIP, UPDATE_TRIP } from './types';

export const getTrips = () => {
    return {
        type: GET_TRIPS
    }
}

export const addTrip = trip => dispatch => {
    axios
    .post('api/trips', trip)
    .then(res => {
        const {trips, totalMileage, businessMiles, businessTrips} = res.data;
        dispatch({
            type: SET_TRIPS,
            payload: {
                trips: cleanTrips(trips),
                totalMileage: +totalMileage,
                businessMiles: +businessMiles,
                businessTrips: +businessTrips
            }
        })
    })
}

export const updateTrip = newTrip => dispatch => {
    axios
    .put('api/trips', newTrip)
    .then(res => {
        const {trip, totalMileage, businessMiles, businessTrips} = res.data;
        dispatch({
            type: UPDATE_TRIP,
            payload: {
                newTrip: cleanTrips([trip])[0],
                totalMileage: +totalMileage,
                businessMiles: +businessMiles,
                businessTrips: +businessTrips
            }
        })
    })
}

export const deleteTrip = tripData => {
    return {
        type: DELETE_TRIP,
        payload: tripData
    }
}