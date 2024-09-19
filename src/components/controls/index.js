import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural, priceFormat } from '../../utils';

function Controls({listBasket, onShowModal = ()=> {}}) {

  const callbacks = {
    onShowModal: () => {
      onShowModal();
    },
  };
  return (
    <div className="Controls">
      <div className="Controls-Info">В корзине:
        {!listBasket.length ? <b>пусто</b> : <b>{listBasket.length} {plural(listBasket.length,  {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })}  / {priceFormat(listBasket.reduce((acc, item)=> acc + item.price*item.count, 0))} ₽</b> }
      </div>
      <button className="Controls-Btn" onClick={callbacks.onShowModal}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  listBasket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    }),
  ).isRequired,
  onShowModal:  PropTypes.func,
};

export default React.memo(Controls);
