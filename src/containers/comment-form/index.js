import { memo, useCallback, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import Field from '../../components/field';
import Invite from '../../components/invite';
import SideLayout from '../../components/side-layout';
import Textarea from '../../components/textarea';
import commentsActions from '../../store-redux/comments/actions';
import shallowequal from 'shallowequal';
import { useDispatch } from 'react-redux';
import { useSelector as  useSelectorRedux  }from 'react-redux';

function CommentForm({answer=false, label='Новый комментарий',  children}) {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();
  const dispatch = useDispatch();
  const params = useParams();

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists,
    userId: state.session.user._id,
  }));

  const selectRedux = useSelectorRedux(
    state => ({
      activeId: state.comments.activeId,
    }),
    shallowequal,
  );

  const [value, setData] = useState('');

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    onChange: useCallback((value) => {
      setData(value)
    }, [store]),

    onCancel: useCallback(() => {
      dispatch(commentsActions.setActiveId(""));
    }, [store]),


      // Отправка комментария
    onSubmit: useCallback(
      e => {
        e.preventDefault();
        dispatch(commentsActions.addComment(params.id, value, select.user.profile.name, selectRedux.activeId));
      },
    ),
  };


  return (
    <>
      {select.exists ? (
        <form className = 'CommentForm' onSubmit={callbacks.onSubmit}>
        <Field label={label} typeField = 'textarea'>
          <Textarea rows="4" value={value} onChange={callbacks.onChange} placeholder='Текст'></Textarea>
        </Field>
        <SideLayout>
            <button type="submit">Отправить</button>
            <>
              {answer && <button type="button" onClick={callbacks.onCancel}>Отмена</button>}
            </>
        </SideLayout>
      </form>
      ) :
      (
        <Invite answer={answer} onSignIn={callbacks.onSignIn} onCancel={callbacks.onCancel} children={children}></Invite>
      )}
      </>
  );
}

export default memo(CommentForm);
