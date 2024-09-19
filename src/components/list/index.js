import React from 'react';
import PropTypes, { bool } from 'prop-types';
import Item from '../item';
import ItemBasket from '../item-basket';
import './style.css';

function List({ list, onDeleteItem=() => {}, onAddProduct=() => {}, isModal=false}) {

  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-Item">
          {isModal ? <ItemBasket item={item} onDelete={onDeleteItem}/> : <Item item={item} onAddProduct={onAddProduct} /> }
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  isModal: bool,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onAddProduct: PropTypes.func,
};

export default React.memo(List);
