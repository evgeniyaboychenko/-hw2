import { memo, useCallback, useMemo , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import PageTop from '../../components/page-top';
import Error from '../../components/error';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import UserForm from '../../containers/form';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import Input from '../../components/input';
import UserCard from '../../components/user-card';
import { Navigate , useNavigate, useLocation} from "react-router-dom";


function Auth() {
  const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    // login: state.auth.user.login,
    // password: state.auth.user.password,
    waiting: state.auth.waiting,
    // error:  state.auth.error,
    userName: state.auth.userName,
  }));

  // let navigate = useNavigate();
  // let location = useLocation();
  // let from = location.state?.from?.pathname || "/profile";

  // const userData = {
  //   name: select.userData.profile?.name,
  //   phone: select.userData.profile?.phone,
  //   email: select.userData.email,
  // }


  const { t } = useTranslate();

  const callbacks = {
    // // Отправка формы
    // submitForm: useCallback((login, password, navigate) => store.actions.auth.submitForm(login, password, ()=> navigate(from, { replace: true })), [store]),
    // // на ввод инпута
    // onInput: useCallback((value,name) => store.actions.auth.setParams(value, name), [store]),
    // выход пользователя
    userExit: useCallback(() => store.actions.auth.userExit(), [store]),
  };

  return (
        <PageLayout>
          <PageTop onExit={callbacks.userExit} isAuth={select.isAuth} userName={select.userName}></PageTop>
          <Head title={t('title')}>
            <LocaleSelect />
          </Head>
          <Navigation />

          {select.isAuth ==="AUTH" ? (
            <Navigate to="/profile" replace={true} />
          ) :
          <Spinner active={select.waiting}>
            <UserForm></UserForm>
          </Spinner>
          }
        </PageLayout>
  );
}

export default memo(Auth);
