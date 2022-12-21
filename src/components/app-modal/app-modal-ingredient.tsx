import React from 'react';
import styles from './app-modal.module.css';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

const modalRoot: HTMLElement = document.getElementById("modalRoot")!;

export const ModalIngredient = () => {
  const header: string = "Детали ингредиента";
  const history = useHistory();

  useEffect(() => {
    const keydownHandler = (e : KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          history.goBack();
          break;
        default:
      }
    };

    document.addEventListener('keydown', keydownHandler);

    return () => document.removeEventListener('keydown', keydownHandler);
  })

  const onClose = () => {
    history.goBack();
  }

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
        
        <IngredientDetails />
      </div>
    </ModalOverlay>
    , modalRoot
  );
}

export type TModalOverlay = {
  onClose: () => void,
  children: React.ReactNode
}

const ModalOverlay = ({ onClose, children } : TModalOverlay) => {
  const handleOverlay = (e: React.SyntheticEvent) => {
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
