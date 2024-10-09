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
import CommentList from '../../components/comment-list';
import commentsActions from '../../store-redux/comments/actions';
import shallowequal from 'shallowequal';
import { useDispatch, useSelector } from 'react-redux';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';

function Comments() {
  const store = useStore();
  const dispatch = useDispatch();
  const params = useParams();


  // const select = useSelector(state => ({
  //   commentList: state.comments.commentList,
  //   waiting: state.comments.waiting,
  //   articleId: state.article.id,
  // }));

    const select = useSelector(
    state => ({
      commentList: state.comments.commentList,
      count: state.comments.count,
      waiting: state.comments.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  useInit(() => {
    dispatch(commentsActions.loadComments(params.id));
  }, []);

  // const select = useSelector(state => ({
  //   commentList: state.comments.commentList,
  //   articleId: state.article.id,

  //   // page: state.catalog.params.page,
  //   // limit: state.catalog.params.limit,
  //   // sort: state.catalog.params.sort,
  //   // query: state.catalog.params.query,
  //   // count: state.catalog.count,
  //   waiting: state.comments.waiting,
  // }));


  // const select = useSelector(
  //   state => ({
  //     commentList: state.comments.commentList,
  //     waiting: state.comments.waiting,
  //     articleId: state.article.id,
  //   }),
  //   shallowequal,
  // ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  // const select = useSelector(
  //   state => ({
  //     article: state.article.data,
  //     waiting: state.article.waiting,
  //   }),
  //   shallowequal,
  // ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект




  const callbacks = {
    // // Добавление в корзину
    // addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // // Пагинация
    // onPaginate: useCallback(page => store.actions.catalog.setParams({ page }), [store]),
    // // генератор ссылки для пагинатора
    // makePaginatorLink: useCallback(
    //   page => {
    //     return `?${new URLSearchParams({
    //       page,
    //       limit: select.limit,
    //       sort: select.sort,
    //       query: select.query,
    //     })}`;
    //   },
    //   [select.limit, select.sort, select.query],
    // ),
  };

  const { t } = useTranslate();

  const options = {
    // Категории для фильтра
    comments: useMemo(
      () => [
        ...treeToList(listToTree(select.commentList), (item, level) => ({
          ...item,
          text: item.text,
          level: level,
        })),
      ],
      [select.commentList],
    ),
  };

   // userName={item.profile}
  return (
    <Spinner active={select.waiting}>
      <CommentList count={select.count} comments={options.comments}/>
    </Spinner>
  );
}

export default memo(Comments);
