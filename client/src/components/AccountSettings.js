import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import style from './styles/form.css'

const { form, labelinput, submit } = style;

class AccountSettings extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  static propTypes = {
    prop: PropTypes.object
  }

  render() {
    const { email } = this.props.user;
    return (
      <div>
        <h3>Change Email Address</h3>
        <hr/>
        <p>The email address used to sign in.</p>
        <br/>
        <div>
          <form id="change-email" className="settings-form" style={form}>
            <div style={labelinput}>
              <label>Email: </label>
              <label><strong>{email ? email : "temporary.email@deletethis.com"}</strong></label>
            </div>
            <div style={labelinput}>
              <label for="newEmail">New Email Address: </label>
              <input className="input" type="email" name="newEmail" />
            </div>
            <div style={submit}>
              <input className="submit" type="submit" value="Save"/>
            </div>
          </form>
        </div>
        <br/>
        <div>
          <h3>Change Password</h3>
          <hr/>
          <p>You can change your password by entering a new one below.</p>
          <br/>
          <form id="change-password" className="settings-form" style={form}>
            <div style={labelinput}>
              <label for="oldPassword">Current Password: </label>
              <input className="input" type="password" name="oldPassword" />
            </div>
            <div style={labelinput}>
              <label for="newPassword">New Password: </label>
              <input className="input" type="password" name="newPassword" />
            </div>
            <div style={labelinput}>
              <label for="confirmPassword">Confirm New Password: </label>
              <input className="input" type="password" name="confirmPassword" />
            </div>
            <div style={submit}>
              <input className="submit" type="submit" value="Save"/>
            </div>
          </form>
        </div>
        <br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)