import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import Head from '../head';
import Result from '../result';
import './style.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function Modal({isShowModal=false, list,  onCloseModal=() => {}, onDeleteItemBasket=() => {}}) {

  return (
    <>
      {isShowModal && (
        <div className='Modal'>
          <div className="Modal-Overlay" onClick={onCloseModal}></div>
          <div className="Modal-Container">
            <Head>
                <h1>Корзина</h1>
                <button className='Modal-Close' onClick={onCloseModal}>Закрыть</button>
            </Head>
            <div className="Modal-Content">
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
  list: PropTypes.array.isRequired,
  isShowModal: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onCloseModal:  PropTypes.func,
};

export default React.memo(Modal);
