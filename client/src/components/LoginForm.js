import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormWrapper from './FormWrapper';
import modal from './styles/modal.css'
import formStyle from './styles/form.css'
import { connect } from 'react-redux'
import { login, register } from "./../redux/actions/userActions"
import { Link } from 'react-router-dom';
import LoggedRedirect from './LoggedRedirect';
import ErrorMsg from './ErrorMsg';

const { form, body, subform, redir } = formStyle;

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    }
  }
  static propTypes = {
    isRegister: PropTypes.bool.isRequired,
    close: PropTypes.func
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.props.user.authenticating) return;
    const { isRegister, register, login, close } = this.props;
    const submit = isRegister ? register : login;
    submit({...this.state});
    if (close) close();
  }

  onChange = ({target}) => {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { isRegister, close} = this.props;
    const { authFailed, loggedIn, authenticating } = this.props.user;
    return (
      loggedIn ? <LoggedRedirect to="/"/> :
      <div style={{...modal.overlay, backgroundColor: "transparent"}}>
        <FormWrapper formName="login" title={isRegister ? "Sign Up" : "Log In"} label={isRegister ? "Register" : "Log in"} close={close}>
          {authFailed && <ErrorMsg>{isRegister ? "Account already exists." : "Authorization failed."}</ErrorMsg>}
          <div style={{...body, height: isRegister ? "150px" : "100px"}}>
            <form id="login" onSubmit={this.onSubmit} style={form}>
              {isRegister && 
              <input className="input" onChange={this.onChange} type="text" name="name" placeholder="Your Name" disabled={authenticating}/>
              }
              <input className="input" onChange={this.onChange} type="email" name="email" placeholder="email address" disabled={authenticating}/>
              <input className="input" onChange={this.onChange} type="password" name="password" placeholder="password" minLength="8" maxLength="32" disabled={authenticating}/>
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