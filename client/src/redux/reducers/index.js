import tripReducer from './tripReducer';
import vehicleReducer from './vehicleReducer';
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
    trips: tripReducer,
    vehicles: vehicleReducer
});
export default rootReducer;