import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ children }) {
  return (
    <div className="Head">
      {children}
    </div>
  );
}

Head.propTypes = {
  children: PropTypes.node,
};


export default React.memo(Head);
