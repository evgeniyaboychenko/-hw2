import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";

function ItemBasket({item , onRemove= () => {}}) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => onRemove(item._id),
  };

  return (
    <div className={cn()}>
      {/* <Link className={`${cn('title')} link`} to={`${item._id}`}>{item.title}</Link> */}
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

// ItemBasket.defaultProps = {
//   onRemove: () => {},
// };

export default memo(ItemBasket);
