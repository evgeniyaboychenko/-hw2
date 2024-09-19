import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural, priceFormat } from '../../utils';
import './style.css';

function BasketItem(props) {
  console.log(props);
  // Счётчик выделений
  // const [count, setCount] = useState(0);

  const callbacks = {
    // onClick: () => {
    //   props.onSelect(props.item.code);
    //   if (!props.item.selected)
    //     setCount(count + 1);
    //   }
    // },
    onDeleteItemBasket: e => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
    // onAdd: e => {
    //   e.stopPropagation();
    //   setCount(count + 1);
    //   console.log('добавлии в корзину', count );
    // },

  };

  return (
    <div
      className={'Item' + (props.item.selected ? ' Item_selected' : '')}
      onClick={callbacks.onClick}
    >
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{priceFormat(props.item.price)} ₽</div>
      <div className="Item-count">{props.item.count} шт</div>
      <div className="Item-actions">
        <button onClick={callbacks.onDeleteItemBasket}>Удалить</button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

BasketItem.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
};

export default React.memo(BasketItem);
