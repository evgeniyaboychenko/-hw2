import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { memo, useCallback, useMemo } from 'react';

const ProtectedRoute = ({isAuth , children }) => {
  if (isAuth ==="NO_AUTH") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default memo(ProtectedRoute);
