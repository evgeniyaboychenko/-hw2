import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import List from '../list';
// import Controls from './components/controls';
import Head from '../head';
import Result from '../result';
import './style.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function Modal(props) {
  const {isShowModal,  onCloseModal, list, onDeleteItemBasket } = props;

  return (
    <>
      {isShowModal && (
        <div className='Modal'>
          <div className="Modal__overlay" onClick={() => onCloseModal()}></div>
          <div className="Modal__container">
            <Head>
                <h1>Корзина</h1>
                <button className='Modal__close' onClick={() => onCloseModal()}>Закрыть</button>
            </Head>
            <div className="Modal__content">
              <List
                isModal = {isShowModal}
                list={list}
                onDeleteItem={onDeleteItemBasket}
              />
              <Result list={list}/>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
}

Modal.propTypes = {
  list: PropTypes.array,
  isShowModal: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onCloseModal:  PropTypes.func,
};

Modal.defaultProps = {
  onDeleteItem: () => {},
  onCloseModal: () => {},
};

export default Modal;
