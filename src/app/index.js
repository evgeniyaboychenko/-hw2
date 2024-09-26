import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import ProductDetails from './product-details';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path=":id" element={<ProductDetails />}/>
        </Routes>
      </Router>
      {/* <Main /> */}
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
