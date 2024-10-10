import { memo, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import Comment from '../comment';
import CommentForm from '../../containers/comment-form';
import PropTypes from 'prop-types';
import './style.css';


function CommentList(props) {
  const { comments, onAnswer=()=>{} ,activeId} = props;

  const cn = bem('CommentList');

  return (
    <div className={cn()}>
        <>
        {comments.map(item => (

            <div key={item._id}>
            <Comment  userId = {item._id} text={item.text} date={item.dateCreate} onAnswer={onAnswer} userName={item.author.profile.name}  />
            {!!item.children.length && (
            <CommentList {...props} comments={item.children}/>
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
};

export default memo(CommentList);
