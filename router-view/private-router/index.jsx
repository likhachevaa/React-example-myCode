import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { AppContext } from '../../store/reducer';

export const PrivateRouter = ({ component: Component, ...rest }) => {
  const {
    state: { isLogged },
  } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(location, ...props) => {
        if (isLogged) {
          return <Component {...props} />;
        } else {
          return <Redirect to={routes.login} />;
        }
      }}
    />
  );
};
