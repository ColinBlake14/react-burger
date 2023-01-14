import React from 'react';
import styles from './app-modal.module.css';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { OrderFeedDetails } from '../orders-feed/order-feed-details/order-feed-details';


const modalRoot: HTMLElement = document.getElementById("modalRoot")!;

export const ModalOrderInfo = () => {
  const { id } = useParams<{id: string}>();
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
      <div className={styles.modal__feed}>
        {id ? 
        (
          <div className={`${styles.header} mt-10 ml-10 mr-10`}>
            <p className="text text_type_digits-default">
              #{id}
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
        
        <OrderFeedDetails/>
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
