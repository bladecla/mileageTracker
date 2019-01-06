import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import { connect } from 'react-redux';
import './App.css';



class App extends Component {
  render() {
    const { loggedIn } = this.props.user;
    return (
      <BrowserRouter>
        <React.Fragment>
        <Navbar />
          <Switch>
            <Route path='/' component={Dashboard} exact/>
            <Route path='/login'>
              <LoginForm loggedIn={loggedIn} isRegister={false}/>
            </Route>
            <Route path='/register'>
              <LoginForm loggedIn={loggedIn} isRegister={true}/>
            </Route>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
