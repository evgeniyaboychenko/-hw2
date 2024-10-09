import { memo, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import numberFormat from '../../utils/number-format';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './style.css';

const getDate = (date) => {
  return moment(date).format(`D MMMM YYYY`);
};
const getTime = (date) => {
  return moment(date).format(`H[:]mm`);
};

function Comment(props) {
  // const { onRemove = () => {}, labelCurr = '₽', labelUnit = 'шт', labelDelete = 'Удалить' } = props;
  const { onAnswer = () => {}, userName, userId, date,  text, level } = props;
  moment.locale('ru');
  const cn = bem('Comment');
  const callbacks = {
    onAnswer: e => onAnswer(userId),
  };

  return (
    <div className={cn()} style={{paddingLeft: 30*level + 'px'}}>
      <div className={cn('top')}>
        <div className={cn('user')}>
          {userName}
        </div>
        <span className={cn('date')}>{getDate(date)} в {getTime(date)}</span>
        </div>
        <p className={cn('text')}>
          {text}
        </p>
          <button className={cn('answer')} onClick={callbacks.onAnswer}>Ответить</button>
    </div>
  );
}

Comment.propTypes = {
  // item: PropTypes.shape({
  //   _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //   title: PropTypes.string,
  //   price: PropTypes.number,
  //   amount: PropTypes.number,
  // }).isRequired,
  // link: PropTypes.string,
  // onLink: PropTypes.func,
  userName: propTypes.string,
  userId: propTypes.string,
  date: propTypes.string,
  time:  propTypes.string,
  text:  propTypes.string,
  onAnswer: PropTypes.func,
};

export default memo(Comment);
