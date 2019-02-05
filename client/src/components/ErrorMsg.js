import React from 'react'
import style from './styles/form.css'
const { error } = style;

const ErrorMsg = props => {
  return (
    <p style={error}>
      {props.children}
    </p>
  )
}

export default ErrorMsg
