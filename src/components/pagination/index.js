import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({pageCount, activePageNumber, onSwitch=()=>{}}) {
  const cn = bem('Pagination');

  const callbacks = {
    onSwitch: (evt) => onSwitch(Number(evt.currentTarget.innerText)),
  };

  // const getList = () => {
  //     for(let i = 2; i < 4; i++) {
  //       `<li className={cn('Item')}>${i}</li>`
  //     }
  //   }

  return (
    <ul className={cn()}>
      {activePageNumber > 2 && <li className={cn('Item')} onClick ={callbacks.onSwitch} >1</li>}
      {(activePageNumber > 3 &&  pageCount > 4) && <li className={cn('ItemSpace')}>...</li>}
      {(activePageNumber === pageCount &&  pageCount > 3 ) && <li className={cn('Item')} onClick ={callbacks.onSwitch}>{activePageNumber-2}</li>}
      {activePageNumber > 1 && <li className={cn('Item')} onClick ={callbacks.onSwitch}>{activePageNumber-1}</li>}
      <li className={cn('Item', 'isActive')} onClick ={callbacks.onSwitch}>{activePageNumber}</li>
      {activePageNumber < pageCount && <li className={cn('Item')} onClick ={callbacks.onSwitch}>{activePageNumber+1}</li>}
      {(activePageNumber ===1 && pageCount > 3 ) && <li className={cn('Item')} onClick ={callbacks.onSwitch}>{activePageNumber+2}</li>}
      {activePageNumber < pageCount-2 && <li className={cn('ItemSpace')}>...</li>}
      {activePageNumber < pageCount-1 &&<li className={cn('Item')} onClick ={callbacks.onSwitch}>{pageCount}</li>}
    </ul>
  );
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  activePageNumber: PropTypes.number.isRequired,
  onSwitch: PropTypes.func,
};

// Pagination.defaultProps = {
//   onAdd: () => {},
// };

export default memo(Pagination);
