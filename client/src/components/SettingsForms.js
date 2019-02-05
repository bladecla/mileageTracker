import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'
import style from './styles/form.css'
import tripStyle from './styles/trip.css'
import ErrorMsg from './ErrorMsg';

const { form, labelinput, submit } = style;
const { p } = tripStyle;

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

  onChange = ({ target }) => this.setState({ [target.name]: target.value, invalidInput: false })

  submit = e => {
    e.preventDefault();
    if (this.validate()){
      this.props.onSubmit({newName: this.state.newName});
    }
    else this.setState({invalidInput: true})
  }

  validate = () => {
    return this.state.newName !== this.props.name;
  }

  render() {
    const { name } = this.props;
    const { invalidInput } = this.state;
    return (
      <div>
        <h3>Change Name</h3>
        <hr/>
        <p>Your name.</p>
        <br/>
        <div>
        {invalidInput && <ErrorMsg>New name cannot be the same as the old one.</ErrorMsg>}
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

  onChange = ({ target }) => this.setState({ [target.name]: target.value, invalidInput: false })

  submit = e => {
    e.preventDefault();
    if (this.validate()){
      const { email, onSubmit} = this.props;
      const { password, newEmail } = this.state;
      onSubmit({email, password, newEmail});
    }
    else this.setState({invalidInput: true})
  }

  validate = () => {
    return this.state.newEmail !== this.props.email;
  }

  render() {
    const { email } = this.props;
    const { invalidInput } = this.state;
    return (
      <div>
        <h3>Change Email Address</h3>
        <hr/>
        <p>The email address used to sign in.</p>
        <br/>
        <div>
          {invalidInput && <ErrorMsg>New email address cannot be the same as the old one.</ErrorMsg>}
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

  onChange = ({ target }) => this.setState({ [target.name]: target.value, invalidInput: false })

  submit = e => {
    e.preventDefault();
    if (this.validate()){
      const { email, onSubmit} = this.props;
      const { password, newPassword } = this.state;
      onSubmit(e.target.id, { email, password, newPassword });
    }
    else this.setState({invalidInput: true})
  }

  validate = () => this.state.newPassword === this.state.confirmPassword
  render() {
    const { invalidInput } = this.state;
    return (
      <div>
        <div>
          <h3>Change Password</h3>
          <hr/>
          <p>You can change your password by entering a new one below.</p>
          <br/>
          {invalidInput && <ErrorMsg>New password and confirm password do not match.</ErrorMsg>}
          <form id="change-password" onSubmit={this.submit} className="settings-form" style={form}>
            <div style={labelinput}>
              <label htmlFor="password">Current Password: </label>
              <input className="input" type="password" name="password" onChange={this.onChange} required />
            </div>
            <div style={labelinput}>
              <label htmlFor="newPassword">New Password: </label>
              <input className="input" type="password" name="newPassword" onChange={this.onChange} minLength="8" maxLength="32" required />
            </div>
            <div style={labelinput}>
              <label htmlFor="confirmPassword">Confirm New Password: </label>
              <input className="input" type="password" name="confirmPassword" onChange={this.onChange} minLength="8" maxLength="32" required />
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

export class Reset extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       showResetModal: false
    }
  }

  static propTypes = {
    reset: PropTypes.func.isRequired
  }

  toggleResetModal = () => this.setState({ showResetModal: !this.state.showResetModal })

  submit = e => {
    e.preventDefault();
    this.props.reset();
    this.toggleResetModal();
  }

  render() {
    return (
      <div>
        <div>
          <h3>Reset Account</h3>
          <hr/>
          <p>Permanently delete all trip and vehicle data.</p>
          <br/>
          <div style={submit} className="settings-form">
              <button className="submit" onClick={this.toggleResetModal} style={{backgroundColor: "red", color: "white"}}>
                Reset
              </button>
          </div>
        </div>
        {this.state.showResetModal &&
          <Modal title={"Reset Account?"} formName="reset" label={"Reset Account"} close={this.toggleResetModal}>
            <form id="reset" onSubmit={this.submit}>
              <ErrorMsg>Resetting this account will permanently delete all trip and vehicle records. This cannot be undone.</ErrorMsg>
              <p style={p}>Are you sure you want to reset data for this account?</p>
              <input type="hidden" name="a" value="b"/>
            </form>
          </Modal>
        }
      </div>
    )
  }
}