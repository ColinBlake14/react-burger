import React from 'react';
import styles from './app-modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from 'react';

const modalRoot = document.getElementById("modalRoot");

export const Modal = ({header, children, onClose}) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);

    return () => document.removeEventListener('keydown', keydownHandler);
  })

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.modal}>
        {header ? 
        (
          <div className={`${styles.header} mt-10 ml-10 mr-10`}>
            <p className="text text_type_main-large">
              {header}
            </p>
            <CloseIcon type="primary" onClick={onClose}/>
          </div>
        ) 
        :
        (
          <div className={`${styles.closeIcon__box} pt-15 pr-10`}>
            <CloseIcon type="primary" onClick={onClose}/>
          </div>
        )}
        
        {children}
      </div>
    </ModalOverlay>
    , modalRoot
  );
}

const ModalOverlay = ({ onClose, children }) => {
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={handleOverlay} className={styles.modal__overlay}>
      {children}
    </div>
  );
}

Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}