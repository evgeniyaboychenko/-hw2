import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function PageTop({ title, children }) {
  return (
    <div className="PageTop">
      <Link to='/login'>Вход</Link>
    </div>
  );
}

PageTop.propTypes = {
  // title: PropTypes.node,
  // children: PropTypes.node,
};

export default memo(PageTop);
