import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { cacheUserData } from './../helpers';

const initialState = {};
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

// update cache if state changes. Relies on non-mutated state!
let currentState;
const updateCache = () => {
  let previousState = currentState;
  currentState = store.getState();

  if (currentState !== previousState) {
    const { trips, user, vehicles } = currentState;
    const { name, email } = user;
    const userData = { ...trips, ...vehicles, name, email };
    cacheUserData(userData)
  } 
}

store.subscribe(updateCache);

export default store;