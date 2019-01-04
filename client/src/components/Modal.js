import React from 'react'
import PropTypes from 'prop-types'
import FormWrapper from './FormWrapper'
import style from './styles/modal.css'

const { overlay, wrapper } = style;

const Modal = props => {
  return (
    <div onClick={props.close} style={overlay}>
      <div style={wrapper}>
        <FormWrapper {...props}>
          {props.children}
        </FormWrapper>
      </div>
    </div>
  )
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    formName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

export default Modal;
