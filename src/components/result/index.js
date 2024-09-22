import React from 'react';
import PropTypes from 'prop-types';
import { priceFormat } from '../../utils';
import './style.css';

function Result({finalPrice}) {
  return (
    <div className='Result'> Итого{!finalPrice ? <span>0 ₽</span> : <span>{priceFormat(finalPrice)} ₽</span> }</div>
  );
}

Result.propTypes = {
  finalPrice: PropTypes.number.isRequired,
};

export default React.memo(Result);
