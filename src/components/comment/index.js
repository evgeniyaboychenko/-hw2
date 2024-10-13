import { memo, useCallback, useState, useRef } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.css';

const getDate = (date) => {
  return moment(date).format(`D MMMM YYYY`);
};
const getTime = (date) => {
  return moment(date).format(`H[:]mm`);
};

function Comment(props) {
  const { userName, userId, date,  text, onAnswer=()=>{}, authUser} = props;

  moment.locale('ru');
  const cn = bem('Comment');

  const className = cn('user', {
    'color-grey': (userName === authUser),
  });


  const callbacks = {
    onAnswer: () => {
      onAnswer(userId)},
  };

  return (
    <>
    <div className={cn()} >
      <div className={cn('top')}>
        <div className={className}>
          {userName}
        </div>
        <span className={cn('date')}>{getDate(date)} в {getTime(date)}</span>
        </div>
        <p className={cn('text')}>
          {text}
        </p>
          <button className={cn('answer')} onClick={callbacks.onAnswer}>Ответить</button>
    </div>
    </>
  );
}

Comment.propTypes = {
  authUser: propTypes.string,
  userName: propTypes.string,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  date: propTypes.string,
  text:  propTypes.string,
  onAnswer: PropTypes.func,
};

export default memo(Comment);
