import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header/>
          <Switch>
            <Route path='/' component={Dashboard} exact/>
            <Route path='/login'
              render = {props => {
                const state = props.location.state,
                      redirect = state ? state.redirect : false;
              return <LoginForm redirect={redirect} isRegister={false}/>
            }}
            />
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
