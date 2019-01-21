import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, NavLink, Redirect } from 'react-router-dom'
import AccountSettings from './AccountSettings'
import ManageVehicles from './ManageVehicles'

export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.subroutes = [
      { 
        pathId: "account-settings",
        name: "Account Settings",
        component: <AccountSettings/>
      },
      { 
        pathId: "manage-vehicles", 
        name: "Manage Vehicles",
        component: <ManageVehicles/>
      }
    ]
  
    this.state = {
       component: AccountSettings
    }
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount(){
    if (!this.props.loggedIn) this.props.checkAuth();
  }

  render() {
    const { loggedIn } = this.props;
    return !loggedIn ? <Redirect to="/login" /> : (
      <div className="dash">
        <div id="settings" className="window">
          <nav className="menu">
            <h3>Settings</h3>
            { this.subroutes.map(({pathId, name}) => (
              <NavLink to={`/settings/${pathId}`} className="navlink" key={pathId}>
                <li className="menu-item">{name}</li>
              </NavLink>
            ))}
          </nav>
          <div id="settings-body">
          { this.props.match.params.pathId 
            ?
            <Route path={`/settings/:pathId`} render={
              ({ match }) => this.subroutes.find(({ pathId }) => pathId === match.params.pathId).component
            } />
            :
            <Redirect to="/settings/account-settings" />
          }
          </div>
        </div>
      </div>
    )
  }
}
