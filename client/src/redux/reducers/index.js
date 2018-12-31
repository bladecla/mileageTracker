import tripReducer from './tripReducer';
import vehicleReducer from './vehicleReducer';
import userReducer from './userReducer'
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
    trips: tripReducer,
    vehicles: vehicleReducer,
    user: userReducer
});
export default rootReducer;