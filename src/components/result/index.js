import React from 'react';
import PropTypes from 'prop-types';
import { priceFormat } from '../../utils';
import './style.css';

function Result(props) {
  return (
    <div className='Result'> Итого{!props.list.length ? <span>0 ₽</span> : <span>{priceFormat(props.list.reduce((acc, item)=> acc + item.price*item.count, 0))} ₽</span> }</div>
  );
}

Result.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
};

export default React.memo(Result);
