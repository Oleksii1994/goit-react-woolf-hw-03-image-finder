import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay, ModalContentWindow } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { closeModal, largeImage } = this.props;
    return createPortal(
      <ModalOverlay
        onClick={event => {
          if (event.target === event.currentTarget) {
            closeModal();
          }
        }}
      >
        <ModalContentWindow>
          <img src={largeImage} alt="" />
        </ModalContentWindow>
      </ModalOverlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
