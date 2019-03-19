import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { validateEmail } from './../helpers'
import modal from './styles/modal.css'
import formStyle from './styles/form.css'
import { connect } from 'react-redux'
import { login, register } from "./../redux/actions/userActions"
import { Link } from 'react-router-dom';
import FormWrapper from './FormWrapper';
import LoggedRedirect from './LoggedRedirect';
import ErrorMsg from './ErrorMsg';

const { form, body, subform, redir } = formStyle;

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      credentials: {
        name: "",
        email: "",
        password: ""
      },
      invalidInput: false,
      submitAttempted: false
    }
  }
  static propTypes = {
    isRegister: PropTypes.bool.isRequired,
    close: PropTypes.func
  }

  onSubmit = e => {
    e.preventDefault();
    if (!this.validate() || this.props.user.authenticating) {
      this.setState({
        submitAttempted: true,
        invalidInput: true
      })
      return console.log("invalid credentials");
    }
    const { isRegister, register, login, close } = this.props;
    const submit = isRegister ? register : login;
    const credentials = {...this.state.credentials};
    submit(credentials);
    this.setState({ submitAttempted: true })

    if (close) close();
  }

  validate = () => {
    const { name, email, password, confirmPassword } = this.state.credentials,
          { isRegister } = this.props;
    const validPassword = password.length >= 8 && password.length <= 32,
          passwordsMatch = password === confirmPassword,
          validName = /[a-zA-Z]/.test(name),
          validEmail = validateEmail(email);

    return isRegister 
            ? validEmail && validPassword && validName && passwordsMatch
            : validEmail && validPassword;
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ credentials: { ...this.state.credentials, [name]: value} })
  }

  render() {
    const { isRegister, close} = this.props;
    const { authFailed, loggedIn, authenticating } = this.props.user;
    const { invalidInput, submitAttempted } = this.state;

    return (
      loggedIn ? <LoggedRedirect to="/dashboard"/> :
      <div style={{...modal.overlay, backgroundColor: "transparent"}}>
        <FormWrapper formName="login" title={isRegister ? "Sign Up" : "Log In"} label={isRegister ? "Register" : "Log in"} close={close}>
          {
            (invalidInput && <ErrorMsg>Invalid credentials.</ErrorMsg>)
            ||
            (authFailed && 
            <ErrorMsg>
              {submitAttempted ? (isRegister ? "Account already exists." : "Authorization failed.") : "You are not logged in."}
            </ErrorMsg>)
          }
          {this.state.errors}
          <div style={{...body, width: "75%", height: isRegister ? "150px" : "100px"}}>
            <form id="login" onSubmit={this.onSubmit} style={form}>
              {isRegister && 
              <input className="input" onChange={this.onChange} type="text" name="name" placeholder="Your Name" disabled={authenticating} required/>
              }
              <input className="input" onChange={this.onChange} type="email" name="email" placeholder="email address" disabled={authenticating} required/>
              <input className="input" onChange={this.onChange} type="password" name="password" placeholder="Password" minLength="8" maxLength="32" disabled={authenticating} required/>
              {isRegister &&          
              <input className="input" onChange={this.onChange} type="password" name="confirmPassword" placeholder="Confirm Password" minLength="8" maxLength="32" disabled={authenticating} required/>
              }            
            </form>
          </div>
          <div style={subform}>{
              isRegister 
              ? <div style={redir}><span>Already have an account? </span><Link to="/login">Log In</Link></div>
              : <div style={redir}><span>Don't have an account? </span><Link to="/register">Sign up</Link></div>
          }</div>
        </FormWrapper>
      </div>
    )
  }
}

const mapStateToProps = state => ({ user: state.user })

const mapDispatchToProps = { login, register }

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)