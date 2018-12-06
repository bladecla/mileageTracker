import React from 'react'
import PropTypes from 'prop-types'
import style from './styles/modal.css'

function stayOpen(e){
    e.stopPropagation();
}

const Modal = props => {
    const {overlay, wrapper, header, footer, buttonContainer, submit} = style;
    return (
    <div onClick={props.close} style={overlay}>
        <div style={wrapper}>
            <section className="modal" onClick={stayOpen} >
                <header style={header}>
                    <h2>{props.title}</h2>
                </header>
                {props.children}
                <footer style={footer}>
                    <div style={buttonContainer}>
                        <input type="submit" form={props.formName} value={props.label} style={submit} />
                        <button onClick={props.close} style={{...submit, backgroundColor: "whitesmoke"}}>Cancel</button>
                    </div>
                </footer>
            </section>
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
