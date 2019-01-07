import React from 'react'
import PropTypes from 'prop-types'
import style from './styles/modal.css'

const { header, footer, buttonContainer, submit, title, modal } = style;

function FormWrapper(props) {
  return (
    <section className="modal" onClick={e => e.stopPropagation()} style={modal} >
      <header style={header}>
        <h2 style={title}>{props.title}</h2>
      </header>
      {props.children}
      <footer style={footer}>
        <div style={buttonContainer}>
          <input type="submit" form={props.formName} value={props.label} style={submit} />
          <button onClick={props.close} style={{...submit, backgroundColor: "whitesmoke"}}>Cancel</button>
        </div>
      </footer>
    </section>
  )
}

FormWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default FormWrapper

