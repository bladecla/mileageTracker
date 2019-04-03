import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout, checkAuth } from './redux/actions/userActions'
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import LoginForm from './components/LoginForm';

import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import './App.css';

class App extends Component {
  render() {
    const { loggedIn, name, authFailed, authenticating } = this.props.user;
    const { logout, checkAuth } = this.props;
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navbar loggedIn={loggedIn} name={name} logout={logout} authenticating={authenticating}/>
          <Switch>
            <Route path="/" exact>
              <LandingPage loggedIn={loggedIn}/>
            </Route>
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/login'>
              <LoginForm isRegister={false}/>
            </Route>
            <Route path='/register'>
              <LoginForm isRegister={true}/>
            </Route>
            <Route path='/settings/:pathId?'
              render={({ match }) => 
              <Settings 
                checkAuth={checkAuth} 
                authFailed={authFailed} 
                authenticating={authenticating} 
                loggedIn={loggedIn} 
                match={match}/>}
              />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = { logout, checkAuth }


export default connect(mapStateToProps, mapDispatchToProps)(App);