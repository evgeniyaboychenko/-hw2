import { memo, useCallback } from 'react';
import SideLayout from '../../components/side-layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function Invite() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists,
  }));

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),
  };

  return (
    <SideLayout side="start" padding="small">
      {select.exists ? (
        <span>вы в системе</span>
      ) : (
        <span><button onClick={callbacks.onSignIn}>Войдите</button>, чтобы иметь возможность комментировать</span>
      )}
    </SideLayout>
  );
}

export default memo(Invite);
