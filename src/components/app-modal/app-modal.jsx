import React from 'react';
import styles from './app-modal.module.css';
import ReactDOM from 'react-dom';
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
    <>
      <div className={styles.modal__overlay} onClick={onClose}>
        <div className={styles.modal}>
          <div className={`${styles.header} mt-10 ml-10 mr-10`}>
            <p className="text text_type_main-large">
              {header}
            </p>
            <CloseIcon type="primary" onClick={onClose}/>
          </div>
          {children}
        </div>
      </div>
      
    </>,
    modalRoot
  );
}