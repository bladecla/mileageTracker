import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

// update cache if state changes. Relies on non-mutated state!
let currentState;
const cacheChanges = () => {
  let previousState = currentState;
  currentState = store.getState();

  if (currentState !== previousState) {
    // combine state trees into one stringified JSON object
    const {trips, user, vehicles} = currentState;
    const trees = [trips, user, vehicles];
    const userData = '{' + trees.map(tree => JSON.stringify(tree).slice(1, -1)).join(',') + '}';
    sessionStorage.setItem("userData", userData)
  } 
}

store.subscribe(cacheChanges);

export default store;