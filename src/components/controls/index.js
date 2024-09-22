import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural, priceFormat } from '../../utils';

function Controls({onShowModal = ()=> {}, totalQuantity, finalPrice }) {

  const callbacks = {
    onShowModal: () => {
      onShowModal();
    },
  };
  return (
    <div className="Controls">
      <div className="Controls-Info">В корзине:
        {!totalQuantity ? <b>пусто</b> : <b>{totalQuantity} {plural(totalQuantity,  {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })}  / {priceFormat(finalPrice)} ₽</b> }
      </div>
      <button className="Controls-Btn" onClick={callbacks.onShowModal}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  finalPrice: PropTypes.number.isRequired,
  totalQuantity: PropTypes.number.isRequired,
  onShowModal:  PropTypes.func,
};

export default React.memo(Controls);
