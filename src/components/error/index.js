import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Error({ error='' }) {
  return (
    error && <span className='Form-Error'>{error}</span>
  );
}

Error.propTypes = {
   error: PropTypes.string,
};

export default memo(Error);
