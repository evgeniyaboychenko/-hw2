import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { memo, useCallback, useMemo } from 'react';

const ProtectedRoute = ({isAuth , children }) => {
  const location = useLocation();

  if (isAuth ==="NO_AUTH") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

export default memo(ProtectedRoute);
