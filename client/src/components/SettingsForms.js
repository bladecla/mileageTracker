import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './styles/form.css'

const { form, labelinput, submit } = style;

export class ChangeEmail extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  static propTypes = {
    email: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  onChange = ({ target }) => this.setState({ [target.name]: target.value })

  submit = ({ target, preventDefault }) => {
    preventDefault();
    if (this.validate()){
      const { email, onSubmit} = this.props;
      const { password, newEmail } = this.state;
      onSubmit(target.id, {email, password, newEmail});
      
    }
  }

  validate = () => {
    return true;
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <h3>Change Email Address</h3>
        <hr/>
        <p>The email address used to sign in.</p>
        <br/>
        <div>
          <form id="change-email" onSubmit={this.submit} className="settings-form" style={form}>
            <div style={labelinput}>
              <label>Email: </label>
              <label><strong>{email ? email : "temporary.email@deletethis.com"}</strong></label>
            </div>
            <div style={labelinput}>
              <label htmlFor="newEmail">New Email Address: </label>
              <input className="input" type="email" name="newEmail" onChange={this.onChange} required />
            </div>
            <div style={labelinput}>
              <label htmlFor="password">Enter Your Password: </label>
              <input className="input" type="password" name="password" onChange={this.onChange} required />
            </div>
            <div style={submit}>
              <input className="submit" type="submit" value="Save"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export class ChangePassword extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  static propTypes = {
    email: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  onChange = ({ target }) => this.setState({ [target.name]: target.value })

  submit = e => {
    e.preventDefault();
    if (this.validate()){
      const { email, onSubmit} = this.props;
      const { password, newPassword } = this.state;
      onSubmit(e.target.id, { email, password, newPassword });
    }
  }

  validate = () => this.state.newPassword === this.state.confirmPassword ? true : console.log(`${this.state.newPassword} !== ${this.state.confirmPassword}`)

  render() {
    
    return (
      <div>
        <div>
          <h3>Change Password</h3>
          <hr/>
          <p>You can change your password by entering a new one below.</p>
          <br/>
          <form id="change-password" onSubmit={this.submit} className="settings-form" style={form}>
            <div style={labelinput}>
              <label htmlFor="password">Current Password: </label>
              <input className="input" type="password" name="password" onChange={this.onChange} required />
            </div>
            <div style={labelinput}>
              <label htmlFor="newPassword">New Password: </label>
              <input className="input" type="password" name="newPassword" onChange={this.onChange} minLength="8" required />
            </div>
            <div style={labelinput}>
              <label htmlFor="confirmPassword">Confirm New Password: </label>
              <input className="input" type="password" name="confirmPassword" onChange={this.onChange} minLength="8" required />
            </div>
            <div style={submit}>
              <input className="submit" type="submit" value="Save"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}