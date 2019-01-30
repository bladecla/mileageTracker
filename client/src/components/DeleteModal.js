import React from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'
import style from './styles/trip.css'

const DeleteModal = props => {
  const { resourceName, close, onSubmit } = props;
  return (
    <Modal title={`Delete ${resourceName}?`} formName="delete" label="Delete" close={close}>
      <form id="delete" onSubmit={onSubmit}>
        <p style={style.p}>{`Are you sure you want to delete ${resourceName.toLowerCase()}?`}</p>
        <input type="hidden" name="a" value="b"/>
      </form>
    </Modal>
  )
}

DeleteModal.propTypes = {
  resourceName: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default DeleteModal
