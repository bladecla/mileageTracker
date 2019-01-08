import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';

const LoggedRedirect = props => {
  const {to} = props;
  console.log("Redirecting to " + (to.pathname ? to.pathname : to))
  return <Redirect {...props}/>
}

LoggedRedirect.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
}

export default LoggedRedirect
