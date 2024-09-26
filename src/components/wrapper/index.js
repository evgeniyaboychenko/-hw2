import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Wrapper({ children }) {
  const cn = bem('Wrapper');

  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node,
};

export default memo(Wrapper);
