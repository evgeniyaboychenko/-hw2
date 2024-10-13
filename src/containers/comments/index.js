import { memo, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import { useParams } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Item from '../../components/item';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import Spinner from '../../components/spinner';
import CommentsSection from '../../components/comments';
import commentsActions from '../../store-redux/comments/actions';
import shallowequal from 'shallowequal';
import { useDispatch } from 'react-redux';
import { useSelector as  useSelectorRedux  }from 'react-redux';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';

function Comments() {
  const store = useStore();
  const dispatch = useDispatch();
  const params = useParams();

  const select = useSelector(state => ({
    user: state.session.user,
  }));

  const selectRedux = useSelectorRedux(
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
        ...listToTree(selectRedux.commentList),
      ],
      [selectRedux.commentList],
    ),
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsSection comments={options.comments} onAnswer={callbacks.onAnswer}  authUser={select.user.profile?.name} activeId={selectRedux.activeId} count={selectRedux.commentList.length}/>
    </Spinner>
  );
}

export default memo(Comments);
