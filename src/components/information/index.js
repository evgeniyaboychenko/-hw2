import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function Information({info, onAdd = () => {}}) {
  const cn = bem('Information');

  const basketItem = {
    _id: info._id,
    title: info.title,
    price: info.price,
  }

  const callbacks = {
    onAdd: e => onAdd(basketItem),
  };

  return (
    <div className={cn()}>
      <div className={cn('Item')}>{info.description}</div>
      <div className={cn('Item')}>Страна производитель:
        <b>{info.madeIn} ({info.madeInCode})</b>
      </div>
      <div className={cn('Item')}>Категория:
        <b>{info.category}</b>
      </div>
      <div className={cn('Item')}>Год выпуска:
        <b>{info.edition}</b>
      </div>
      <div className={cn('Item', 'Information-Price')}>Цена:
        <b>{numberFormat(info.price)} ₽</b>
      </div>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

Information.propTypes = {
  info: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn:  PropTypes.string,
    category:  PropTypes.string,
    edition:  PropTypes.number,
    price:  PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(Information);
