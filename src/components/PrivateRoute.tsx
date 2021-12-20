import {Navigate} from 'react-router-dom';
import React from 'react';

interface PrivateRoutePropsI {
  component: React.FC
  isLogged: string
}

export const PrivateRoute = ({component: RouteComponent, isLogged}: PrivateRoutePropsI): JSX.Element =>{
  if (isLogged) {
    return <RouteComponent />;
  }

  return <Navigate to="/" />;
};
