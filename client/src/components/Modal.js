import React from 'react'
import PropTypes from 'prop-types'
import style from './styles/modal.css'

function stayOpen(e){
    e.stopPropagation();
}

const Modal = props => {
    return (
    <div onClick={props.close} style={style.overlay}>
        <section className="modal" onClick={stayOpen} >
            <header style={style.header}>
                <h2>{props.title}</h2>
                <button onClick={props.close} style={style.close}>&times;</button>
            </header>
            {props.children}
            <footer style={style.footer}>
                <input type="submit" form={props.formName} value={props.label} style={style.submit} />
            </footer>
        </section>
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
