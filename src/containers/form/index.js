import { memo, useCallback, useMemo , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
// import useInit from '../../hooks/use-init';
// import PageLayout from '../../components/page-layout';
// import PageTop from '../../components/page-top';
import Error from '../../components/error';
// import Head from '../../components/head';
// import Navigation from '../../containers/navigation';
// import Spinner from '../../components/spinner';
// import ArticleCard from '../../components/article-card';
// import LocaleSelect from '../../containers/locale-select';
import Input from '../../components/input';
// import UserCard from '../../components/user-card';
import { Navigate , useNavigate, useLocation} from "react-router-dom";

function UserForm() {
  const store = useStore();

  const select = useSelector(state => ({
    // isAuth: state.auth.isAuth,
    login: state.auth.user.login,
    password: state.auth.user.password,
    // waiting: state.auth.waiting,
    error:  state.auth.error,
    // userName: state.auth.userName,
  }));

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/profile";

  const { t } = useTranslate();

  const callbacks = {
    // Отправка формы
    submitForm: useCallback((login, password, navigate) => store.actions.auth.submitForm(login, password, ()=> navigate(from, { replace: true })), [store]),
    // на ввод инпута
    onInput: useCallback((value,name) => store.actions.auth.setParams(value, name), [store]),
    // // выход пользователя
    // userExit: useCallback(() => store.actions.auth.userExit(), [store]),
  };

  return (
    <div className='Form'>
        <h2 className='Form-Title'>Вход</h2>
        <form onSubmit={(evt)=>{evt.preventDefault(); callbacks.submitForm(select.login, select.password, navigate)}}>
          <div className='Form-Wrapper'>
            <Input
              type='text'
              label='Логин'
              value={select.login}
              name = 'login'
              onChange={callbacks.onInput}
            />
            <Input
              type='password'
              label='Пароль'
              value={select.password}
              name = 'password'
              onChange={callbacks.onInput}
            />
            <Error error = {select.error}/>
            <button type='submit'>Войти</button>
            </div>
        </form>
      </div>
    );
  }

export default memo(UserForm);
