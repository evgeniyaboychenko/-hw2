import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
// import Field from '../../components/field';
// import Textarea from '../../components/textarea';
import Navigation from '../../containers/navigation';
import Comments from '../../containers/comments';
import Invite from '../../containers/invite';
import SideLayout from '../../components/side-layout';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import useTranslate from '../../hooks/use-translate';

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  const params = useParams();

  // const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  // const select = useSelector(state => ({
  //   user: state.session.user,
  //   exists: state.session.exists,
  // }));

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
  }, [params.id]);

  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // onChange: useCallback((value) => {
    //     setData(prevData => ({ ...prevData, [name]: value }));
    //   }, []),
    // onSignIn: useCallback(() => {
    //   navigate('/login', { state: { back: location.pathname } });
    // }, [location.pathname]),
  };



  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
        <Comments/>
        {/* <form className = 'CommentForm'onSubmit={callbacks.onSubmit}>
          <Field label='Новый комментарий' typeField = 'textarea'>
            <Textarea rows="5" name="comment" value="" onChange={callbacks.onChange} placeholder="Текст"></Textarea>
          </Field>
          <Field>
            <button type="submit">Отправить</button>
          </Field>
        </form> */}
        <Invite>чтобы иметь возможность комментировать</Invite>

    </PageLayout>
  );
}

export default memo(Article);
