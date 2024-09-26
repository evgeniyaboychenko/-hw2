import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const getPaginationArray = (activePageNumber, pageCount) => {
  const arr= [];
  if(activePageNumber > 2) arr.push({text: '1', status:''});
  if(activePageNumber > 3 &&  pageCount > 4) arr.push({text: '...', status:'space'});
  if(activePageNumber === pageCount &&  pageCount > 3) arr.push({text: activePageNumber-2, status:''})
  if(activePageNumber > 1) arr.push({text: activePageNumber-1, status:''})
  arr.push({text: activePageNumber, status:'active'})
  if(activePageNumber < pageCount) arr.push({text: activePageNumber+1, status:''})
  if(activePageNumber ===1 && pageCount > 3 ) arr.push({text: activePageNumber+2, status:''})
  if(activePageNumber < pageCount-2 &&  pageCount > 4) arr.push({text: '...', status:'space'})
  if(activePageNumber < pageCount-1) arr.push({text: pageCount, status:''})
  return arr;
}

function Pagination({pageCount, activePageNumber, onSwitch=()=>{}}) {
  const cn = bem('Pagination');

  const callbacks = {
    onSwitch: (evt) => onSwitch(Number(evt.currentTarget.innerText)),
  };

  return (
    <ul className={cn()}>
      {getPaginationArray(activePageNumber, pageCount).map((item, index)=>
        (<li key={index} className={item.status === 'space'? 'Pagination-ItemSpace': `Pagination-Item ${item.status === 'active' && 'isActive'}`} onClick ={(item.status!=='space'&&item.status !== 'active') ?  callbacks.onSwitch: ()=>{}}>{item.text}</li>))}
    </ul>
  );
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  activePageNumber: PropTypes.number.isRequired,
  onSwitch: PropTypes.func,
};

export default memo(Pagination);
