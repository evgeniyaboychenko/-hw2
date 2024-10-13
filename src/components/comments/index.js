import { memo, useCallback, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import CommentList from '../comment-list';
import CommentForm from '../../containers/comment-form';
import numberFormat from '../../utils/number-format';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './style.css';

function CommentsSection({comments, count,onAnswer=()=>{}, activeId ,authUser}) {

  return (
    <section className='CommentsSection'>
       <h2 className ='CommentsSection-title'>Комментарии ({count})</h2>
        <CommentList authUser={authUser} comments={comments} onAnswer={onAnswer} activeId={activeId}/>
        {!activeId && <CommentForm><span>, чтобы иметь возможность комментировать. </span></CommentForm>}
    </section>
  );
}

CommentsSection.propTypes = {
  comments: propTypes.array,
  count:  propTypes.number,
  activeId:  propTypes.string,
  onAnswer: PropTypes.func,
  authUser: propTypes.string,
};

export default memo(CommentsSection);
