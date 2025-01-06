import React from 'react';
import '../styles/Modal.css'; 

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        {children} 
      </div>
    </div>
  );
};

export default Modal;
