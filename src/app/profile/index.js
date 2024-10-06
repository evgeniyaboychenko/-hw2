import { memo, useCallback, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import PageTop from '../../components/page-top';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import UserCard from '../../components/user-card';
import { Navigate } from "react-router-dom";

/**
 * Страница пользователя
 */
function Profile() {
  const store = useStore();

  const token = localStorage.getItem('token');

  useEffect(() => {
    store.actions.user.loadTokenAuth(token);
  }, [token]);

  // // Параметры из пути /articles/:id
  // const params = useParams();

  // useInit(() => {
  //   store.actions.article.load(params.id);
  // }, [params.id]);

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    userName: state.auth.userName,
    userData: state.user.userData,
    waiting: state.auth.waiting,
  }));

  const { t } = useTranslate();

  const userData = {
    name: select.userData.profile?.name,
    phone: select.userData.profile?.phone,
    email: select.userData.email,
  }

  const callbacks = {
    userExit: useCallback(() => store.actions.auth.userExit(), [store]),
  };

  return (
    <PageLayout>
      {/* {select.isAuth ==="NO_AUTH" ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <> */}
          <PageTop onExit={callbacks.userExit} isAuth={select.isAuth} userName={select.userName}></PageTop>
          <Head title={t('title')}>
            <LocaleSelect />
          </Head>
          <Navigation />
          <UserCard userData = {userData} ></UserCard>
        {/* </>
      )
    } */}
      </PageLayout>
  );
}

export default memo(Profile);
