import { memo } from 'react';
import propTypes from 'prop-types';
import PropTypes from 'prop-types';
import './style.css';

function Invite({answer, onCancel=()=> {} ,onSignIn=()=>{}, children, myRef }) {

  return (
    <div className='Invite'>
      <button className='Invite-In' ref={myRef} onClick={onSignIn}>Войдите</button>
      {children}
      {answer && <button className='Invite-Cancel' onClick={onCancel}>Отмена</button>}
    </div>
  );
}

Invite.propTypes = {
  answer: propTypes.bool,
  children: PropTypes.node,
  onSignIn: PropTypes.func,
  onCancel: PropTypes.func,
};

export default memo(Invite);
