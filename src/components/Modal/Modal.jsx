import { createPortal } from 'react-dom';

import { ModalOverlay, ModalContentWindow } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, largeImage }) => {
  return createPortal(
    <ModalOverlay
      onClick={() => {
        closeModal();
      }}
    >
      <ModalContentWindow>
        <img src={largeImage} alt="tag" />
      </ModalContentWindow>
    </ModalOverlay>,
    modalRoot
  );
};
