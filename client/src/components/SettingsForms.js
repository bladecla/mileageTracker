import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './styles/form.css'

const { form, labelinput, submit } = style;

export class ChangeName extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  static propTypes = {
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  onChange = ({ target }) => this.setState({ [target.name]: target.value })

  submit = e => {
    e.preventDefault();
    if (this.validate()){
      this.props.onSubmit({newName: this.state.newName});
    }
  }

  validate = () => {
    return this.state.newName !== this.props.name;
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <h3>Change Name</h3>
        <hr/>
        <p>Your name.</p>
        <br/>
        <div>
          <form id="change-name" onSubmit={this.submit} className="settings-form" style={form}>
            <div style={labelinput}>
              <label>Name: </label>
              <label><strong>{name}</strong></label>
            </div>
            <div style={labelinput}>
              <label htmlFor="newName">New Name: </label>
              <input className="input" type="text" name="newName" onChange={this.onChange} required />
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

  submit = e => {
    e.preventDefault();
    if (this.validate()){
      const { email, onSubmit} = this.props;
      const { password, newEmail } = this.state;
      onSubmit({email, password, newEmail});
      
    }
  }

  validate = () => {
    return this.state.newEmail !== this.props.email;
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