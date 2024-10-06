import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Auth from './auth';
import Profile from './profile';
import ProtectedRoute from './protected'
/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  useEffect(() => {
    store.actions.auth.loadUserName();
  }, []);


  const activeModal = useSelector(state => state.modals.name);
  const isAuth = useSelector(state => state.auth.isAuth);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Auth />} />
        <Route
            path="/profile"
            element= {
              <ProtectedRoute isAuth={isAuth}>
                <Profile />
              </ProtectedRoute>
            }
          />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
