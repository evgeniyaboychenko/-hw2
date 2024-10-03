import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function UserCard({userData}) {
  const cn = bem('UserCard');
  return (
    <div className={cn()}>
      <h1 className={cn('title')}>Профиль</h1>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя:</div>
        <div className={cn('value')}>{userData.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>{userData.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{userData.email}</div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  userData: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

// UserCard.defaultProps = {
//   onAdd: () => {},
//   t: text => text,
// };

export default memo(UserCard);
