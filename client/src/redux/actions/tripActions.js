import axios from 'axios';
import { cleanTrips, cleanNumbers, success } from './../../helpers';
import { ADD_TRIP, SET_TRIPS, GET_TRIPS, DELETE_TRIP, UPDATE_TRIP, SELECT_TRIP, BATCH_UPDATE_TRIP, BATCH_DELETE_TRIP, SELECT_ALL, DESELECT_ALL, BATCH_SELECT_TRIP, ADD_VEHICLE } from './types';

export const selectTrip = trip => {
    return {
        type: SELECT_TRIP,
        payload: trip
    }
}

export const batchSelectTrip = (trips, isSelect = true) => {
    return {
        type: BATCH_SELECT_TRIP,
        payload: {
            trips,
            isSelect
        }
    }
}

export const selectAll = (isSelect = true) => {
    return {
        type: isSelect ? SELECT_ALL : DESELECT_ALL
    }
}

export const getTrips = () => dispatch => {
    axios
    .get('/api/trips')
    .then(({data}) => {
        if(success(data.status, dispatch)){
            const {trips, totalMileage, businessMiles, businessTrips} = data;
            dispatch({
                type: SET_TRIPS,
                payload: {
                    ...cleanNumbers({ totalMileage, businessMiles, businessTrips }),
                    trips: cleanTrips(trips)
                }
            })
        }
    }, err => console.error(err) )
}

export const addTrip = trip => dispatch => {
    axios
    .post('/api/trips', trip)
    .then(({data}) => {
        if(success(data.status, dispatch)){
            const {trip, totalMileage, businessMiles, businessTrips} = data;
            dispatch({
                type: ADD_TRIP,
                payload: {
                    ...cleanNumbers({ totalMileage, businessMiles, businessTrips }),
                    trip: cleanTrips(trip)
                }
            })
        }
    }, err => console.error(err) )
}

export const updateTrip = newTrip => dispatch => {
    axios
    .put('/api/trips', newTrip)
    .then(({data}) => {
        if (success(data.status, dispatch)){
            const {trip, totalMileage, businessMiles, businessTrips} = data;
            dispatch({
                type: UPDATE_TRIP,
                payload: {
                    ...cleanNumbers({ totalMileage, businessMiles, businessTrips }),
                    newTrip: cleanTrips(trip)
                }
            })
        }    
    }, err => console.error(err))
}

export const deleteTrip = tripId => dispatch => {
    console.log(tripId)
    axios
    .delete('/api/trips/' + tripId)
    .then(({data})=> {
        if (success(data.status)){
            const {_id, totalMileage, businessMiles, businessTrips} = data;
            dispatch({
                type: DELETE_TRIP,
                payload: {
                    ...cleanNumbers({ totalMileage, businessMiles, businessTrips }),
                    _id
                }
            })
        }
    }, err => console.error(err))
}

export const batchUpdateTrips = (tripIds, updates, isVehicleNew) => dispatch => {
    const body = { tripIds, updates }
    if (isVehicleNew) body.isVehicleNew = isVehicleNew;
    // console.log(isVehicleNew, updates.vehicle)
    axios
    .put('/api/trips/batch', body)
    .then(({data}) => {
        console.log(data)
        if (success(data.status, dispatch)){
            const {trips, totalMileage, businessMiles, businessTrips} = data;
            dispatch({
                type: BATCH_UPDATE_TRIP,
                payload: {
                    ...cleanNumbers({ totalMileage, businessMiles, businessTrips }),
                    trips: cleanTrips(trips)
                }
            })
            if (isVehicleNew && updates.vehicle) {
                console.log("adding vehicle ", updates.vehicle)
                dispatch({
                    type: ADD_VEHICLE,
                    payload: updates.vehicle
                })
            }
        }
    }, err => console.error(err))
}

export const batchDeleteTrips = tripIds => dispatch => {
    axios
    .post('/api/trips/batch', {tripIds})
    .then(({data}) => {
        if (success(data.status, dispatch)){
            const {trips, totalMileage, businessMiles, businessTrips} = data;
            dispatch({
                type: BATCH_DELETE_TRIP,
                payload: {
                    ...cleanNumbers({ totalMileage, businessMiles, businessTrips }),
                    trips
                }
            })
        }
    }, err => console.error(err))
}