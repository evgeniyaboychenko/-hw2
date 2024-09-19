import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural, priceFormat } from '../../utils';
import './style.css';

function Item(props) {
  // Счётчик выделений
  // const [count, setCount] = useState(0);

  const callbacks = {
    // onClick: () => {
    //   props.onSelect(props.item.code);
    //   if (!props.item.selected) {
    //     setCount(count + 1);
    //   }
    // },
    // onDelete: e => {
    //   e.stopPropagation();
    //   props.onDelete(props.item.code);
    // },
    onAddProduct: () => {
      props.onAddProduct(props.item.code);
    },
  };

  return (
    <div className='Item'>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}{' '}
        {props.item.count
          ? ` | добавили ${props.item.count} ${plural(props.item.count, {
              one: 'раз',
              few: 'раза',
              many: 'раз',
            })}`
          : ''}
      </div>
      <div className="Item-price">{priceFormat(props.item.price)} ₽</div>
      <div className="Item-actions">
        <button onClick={callbacks.onAddProduct}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onAddProduct: PropTypes.func,
};

Item.defaultProps = {
  onAddProduct: () => {},
};

export default React.memo(Item);
