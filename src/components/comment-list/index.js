import { memo, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import Comment from '../comment';
import CommentForm from '../../containers/comment-form';
import PropTypes from 'prop-types';
import './style.css';


function CommentList(props) {
  const { comments, onAnswer=()=>{} ,activeId, authUser, level=0} = props;

  const cn = bem('CommentList');
  const className = cn({
    'ml-0': (level > 10),
  });

  return (
    <div className={className}>
        <>
        {comments.map(item => (
            <div key={item._id}>
            <Comment userId = {item._id} authUser={authUser} text={item.text} date={item.dateCreate} onAnswer={onAnswer} userName={item.author.profile.name}  />
            {!!item.children.length && (
            <CommentList {...props} comments={item.children} level={level+1}/>
          )}
          {activeId===item._id && <CommentForm label={'Новый ответ'} answer={true}><span>, чтобы иметь возможность ответить. </span></CommentForm>}
          </div>
        ))
        }
        </>
      </div>
  );
}

CommentList.propTypes = {
  activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: propTypes.string,
      date: propTypes.string,
      userName: PropTypes.shape({author: PropTypes.shape({profile: PropTypes.shape({name: propTypes.string,})}),}),
    }),
  ).isRequired,
  onAnswer: PropTypes.func,
  authUser:  propTypes.string,
};

export default memo(CommentList);
