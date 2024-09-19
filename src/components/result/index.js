import React from 'react';
import PropTypes from 'prop-types';
import { priceFormat } from '../../utils';
import './style.css';

function Result({list}) {
  return (
    <div className='Result'> Итого{!list.length ? <span>0 ₽</span> : <span>{priceFormat(list.reduce((acc, item)=> acc + item.price*item.count, 0))} ₽</span> }</div>
  );
}

Result.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    }),
  ).isRequired,
};

export default React.memo(Result);
