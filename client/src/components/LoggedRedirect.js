import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';

const LoggedRedirect = ({to}) => {
  console.log("Redirecting to " + to)
  return <Redirect to={to}/>
}

LoggedRedirect.propTypes = {
  to: PropTypes.string.isRequired
}

export default LoggedRedirect
