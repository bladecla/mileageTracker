import React from 'react'
import PropTypes from 'prop-types'
import style from './styles/modal.css'

const Modal = props => {
    return (
    <div style={style.overlay}>
        <div className="modal">
            <header style={style.header}>
                <h2>{props.title}</h2>
                <button onClick={props.close} style={style.close}>&times;</button>
            </header>
            {props.children}
            <footer style={style.footer}>
                <input type="submit" form={props.formName} value={props.label} style={style.submit} />
            </footer>
        </div>
    </div>
  )
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Modal;
