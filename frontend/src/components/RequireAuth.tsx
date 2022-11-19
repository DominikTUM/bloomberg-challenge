import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../hooks/hooks';

export default function RequireAuth({children}: {children: JSX.Element}) {
  const location = useLocation();
  const isLoggedIn = useAppSelector((state) => state.token.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to='/' state={{from: location}} replace />;
  }

  return children;
}
