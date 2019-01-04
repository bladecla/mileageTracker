import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Dashboard} exact/>
          <Route path='/login' component={LoginForm}/>
        </Switch>
      </BrowserRouter>
    </Provider>
    );
  }
}

export default App;
