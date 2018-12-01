import tripReducer from './tripReducer';
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
    trips: tripReducer
});
export default rootReducer;