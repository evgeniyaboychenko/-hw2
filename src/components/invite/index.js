import { memo, useCallback, useState } from 'react';
import SideLayout from '../../components/side-layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import './style.css';

function Invite({onSignIn=()=>{}, children}) {
  const [visible, setVisible] = useState(true);
  const onCancel = () => {
    setVisible(false);
  };

  // const { t } = useTranslate();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const store = useStore();

  // const select = useSelector(state => ({
  //   user: state.session.user,
  //   exists: state.session.exists,
  // }));

  // const callbacks = {
  //   // Переход к авторизации
  //   onSignIn: useCallback(() => {
  //     navigate('/login', { state: { back: location.pathname } });
  //   }, [location.pathname]),
  // };



  const callbacks = {
    onSignIn: () => onSignIn(),
  };


  return (
    {visible} && (<SideLayout side="start" padding="small">
       <div className='Invite'>
        <button className='Invite-In' onClick={callbacks.onSignIn}>Войдите</button>,
        {children}
        <button className='Invite-Cancel' onClick={onCancel}>Отмена</button>
      </div>
    </SideLayout>)

  );
}

export default memo(Invite);
