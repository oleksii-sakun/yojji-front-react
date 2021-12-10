import {Navigate} from 'react-router-dom';

export const PrivateRoute = ({component: RouteComponent, isLogged}): JSX.Element =>{
  if (isLogged) {
    return <RouteComponent />;
  }

  return <Navigate to="/" />;
};
