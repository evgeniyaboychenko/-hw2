import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { priceFormat } from '../../utils';
import './style.css';

function ItemBasket({item, onDeleteItemBasket=()=> {} }) {

  const callbacks = {
    onDeleteItemBasket: () => {
      onDeleteItemBasket(item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-Code">{item.code}</div>
      <div className="Item-Title">{item.title}</div>
      <div className="Item-Price">{priceFormat(item.price)} ₽</div>
      <div className="Item-Count">{item.count} шт</div>
      <div className="Item-Actions">
        <button onClick={callbacks.onDeleteItemBasket}>Удалить</button>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(ItemBasket);
