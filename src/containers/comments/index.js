import { memo, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import { useParams } from 'react-router-dom';
// import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Item from '../../components/item';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import Spinner from '../../components/spinner';
import CommentsSection from '../../components/comments';
import commentsActions from '../../store-redux/comments/actions';
import shallowequal from 'shallowequal';
import { useDispatch, useSelector } from 'react-redux';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';

function Comments() {
  const store = useStore();
  const dispatch = useDispatch();
  const params = useParams();


  const select = useSelector(
  state => ({
    commentList: state.comments.commentList,
    waiting: state.comments.waiting,
    activeId: state.comments.activeId,
  }),
  shallowequal,
); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  useInit(() => {
    dispatch(commentsActions.loadComments(params.id));
  }, [params.id]);


  const callbacks = {
    onAnswer: useCallback((id) => {
      dispatch(commentsActions.setActiveId(id));
    }, [store]),

  };

  const { t } = useTranslate();


  const options = {
    comments: useMemo(
      () => [
        ...listToTree(select.commentList),
      ],
      [select.commentList],
    ),
  };

  return (
    <Spinner active={select.waiting}>
      <CommentsSection comments={options.comments} onAnswer={callbacks.onAnswer} activeId={select.activeId} count={select.commentList.length}/>
    </Spinner>
  );
}

export default memo(Comments);
