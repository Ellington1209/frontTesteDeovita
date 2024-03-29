import React from 'react';
import { Navigate } from 'react-router-dom';
import Menu from '../Menu';





function PrivateRouter({ children }) {
  const Token = "token";
  const isAuthenticated = () => localStorage.getItem(Token) !== null;

  return isAuthenticated() ? <Menu>{children}</Menu> : <Navigate to="/login" />;
}



export default PrivateRouter;