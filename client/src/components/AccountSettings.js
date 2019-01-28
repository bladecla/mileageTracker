import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ChangeEmail, ChangePassword, ChangeName, Reset } from './SettingsForms';
import { changePassword, changeEmail, changeName, reset } from '../redux/actions/userActions';


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
    const { email, name } = this.props.user;
    const { changePassword, changeEmail, changeName, reset } = this.props;
    return (
      <div>
        <ChangeName onSubmit={changeName} name={name} />
        <br/>
        <ChangeEmail onSubmit={changeEmail} email={email} />
        <br/>
        <ChangePassword onSubmit={changePassword} email={email} />
        <br/>
        <Reset reset={reset}/>
        <br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = { changePassword, changeEmail, changeName, reset }

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)