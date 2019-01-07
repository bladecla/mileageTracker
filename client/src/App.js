import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        <Navbar />
          <Switch>
            <Route path='/' component={Dashboard} exact/>
            <Route path='/login'>
              <LoginForm isRegister={false}/>
            </Route>
            <Route path='/register'>
              <LoginForm isRegister={true}/>
            </Route>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
