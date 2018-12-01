import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <div>
        <Dashboard/>
      </div>
    </Provider>
    );
  }
}

export default App;
