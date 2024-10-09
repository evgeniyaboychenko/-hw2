import { memo, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import Comment from '../comment';
import numberFormat from '../../utils/number-format';
import PropTypes from 'prop-types';
import './style.css';
// import treeToList from '../../utils/tree-to-list';
// import listToTree from '../../utils/list-to-tree';

function CommentList(props) {
  const { count = 0, comments  } = props;

  const cn = bem('Comments');
  return (
    <div className={cn()}>
        <h2 className = {cn('title')}>Комментарии ({count})</h2>
        {comments.map(item => (
          <Comment key={item._id} userName={item.author.profile.name}  userId = {item._id} text={item.text} date={item.dateCreate} level={item.level}/>
          ))
        }
      </div>
  );
}

CommentList.propTypes = {
  count: propTypes.number,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: propTypes.string,
      date: propTypes.string,
      level: PropTypes.number,
      // userName: propTypes.string,
    }),
  ).isRequired,
  onAnswer: PropTypes.func,
};

export default memo(CommentList);
