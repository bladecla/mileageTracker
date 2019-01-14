import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountSettings from './AccountSettings'
import ManageVehicles from './ManageVehicles'

export default class Settings extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       component: <AccountSettings/>
    }
  }

  accountSettings = () => this.setState({ component: <AccountSettings/> })
  manageVehicles = () => this.setState({ component: <ManageVehicles/> })
  
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const { component } = this.state;
    return (
      <div className="dash">
        <div id="settings" className="window">
          <nav className="menu">
            <a className="navlink" onClick={this.accountSettings} href="#account-settings"><li className="menu-item">Account Settings</li></a>
            <a className="navlink" onClick={this.manageVehicles} href="#manage-vehicles"><li className="menu-item">Manage Vehicles</li></a>
            <a className="navlink" href="#"><li className="menu-item">Something Else</li></a>
          </nav>
          <div id="settings-body">
            {component}
          </div>
        </div>
      </div>
    )
  }
}
