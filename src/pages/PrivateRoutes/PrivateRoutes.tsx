import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const token = Cookies.get('token');
  return token ? element : <Navigate to="/auth/signin" />;
};

export default PrivateRoute;