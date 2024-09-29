import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { Link } from "react-router-dom";


function Item({item, onAdd= () => {}, linkTo}) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => onAdd(item),
  };

  return (
    <div className={cn()}>
      <Link className={`${cn('title')} Link`} to={linkTo}>{item.title}</Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  linkTo: PropTypes.string,
};

export default memo(Item);
