import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout({ children, onCloseModal=() => {}, isShowModal=false}) {
  const cn = bem('Modal');

  return (
    <>
      {isShowModal && (
        <div className={cn()}>
          <div className={cn('Overlay')} onClick={onCloseModal}></div>
          <div className={cn('Container')}>
            {children}
          </div>
        </div>
      )
      }
    </>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  onCloseModal:  PropTypes.func,
  isShowModal: PropTypes.bool,
};

export default React.memo(ModalLayout);
