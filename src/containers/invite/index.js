import { memo, useCallback, useState } from 'react';
import SideLayout from '../../components/side-layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import Field from '../../components/field';
import Textarea from '../../components/textarea';
import commentsActions from '../../store-redux/comments/actions';
import { useDispatch } from 'react-redux';

function Invite({children}) {
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

  const [visible, setVisible] = useState(false);
  const onCancel = () => {
    setVisible(true);
  };

  const [comment, setData] = useState({
    comment: '',
  });


  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    onChange: useCallback(() => {
      setData(comment);
    }, []),


      // Отправка комментария
    onSubmit: useCallback(
      e => {
        e.preventDefault();
        dispatch(commentsActions.addComment(params.id,'zxa', select.user.profile.name));
      },
    ),
  };

  return (
    <>
      {select.exists ? (
        <form className = 'CommentForm'onSubmit={callbacks.onSubmit}>
        <Field label='Новый комментарий' typeField = 'textarea'>
          <Textarea rows="5" name="comment" value="" onChange={callbacks.onChange} placeholder="Текст"></Textarea>
        </Field>
        <Field>
          <button type="submit">Отправить</button>
        </Field>
      </form>
      ) :
      (<div className='Invite' hidden={visible}>
        <button className='Invite-In' onClick={callbacks.onSignIn}>Войдите</button>,
        {children}
        <button className='Invite-Cancel' onClick={onCancel}>Отмена</button>
      </div>)}
      </>
  );
}

export default memo(Invite);
