import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { routes } from '../utils/routes';
import { Route } from 'react-router';
import Index from '../pages/landing-page';
import { FormLayout } from '../pages/landing-page/components/form/layouts/form-layout';
import { PuppeeterPage } from '../pages/puppeeter-page';
import { LoginLayout, SmsPassword } from '../account/containers/login';
import { LkWrapper } from '../account/components/lk-wrapper';
import { LandingError } from '../pages/landing-error';
import { LandingSuccess } from '../pages/landing-success';
import { RegSuccess } from '../account/containers/login/components/reg-success';
import { PrivateRouter } from './private-router';
import jwtDecode from 'jwt-decode';
import { AppContext } from '../store/reducer';
import { userActionTypes } from '../store/types';
import { axiosCreate, requests } from '../utils/axios';

export const RouterView = () => {
  const { dispatch } = useContext(AppContext);
  const verifyToken = (token) => {
    if (!token) {
      return false;
    }
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  };

  const setIsLogged = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      axiosCreate.defaults.headers.common['Auth'] = token;
    } else {
      localStorage.removeItem('token');
      delete axiosCreate.defaults.headers.common['Auth'];
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && verifyToken(token)) {
      const { id } = jwtDecode(token);
      const fetchUser = async () => {
        try {
          const {
            data: { data },
          } = await requests.getUser(id);
          dispatch({ type: userActionTypes.SET_USER, payload: data });
        } catch (e) {
          console.error(e);
        }
      };
      fetchUser();

      setIsLogged(token);
    } else {
      setIsLogged();
      dispatch({ type: userActionTypes.LOGOUT });
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path={routes.homePage} component={Index} />
        <PrivateRouter path={routes.order} component={FormLayout} />
        <PrivateRouter path={routes.success} component={LandingSuccess} />
        <PrivateRouter path={routes.failed} component={LandingError} />
        <Route path={routes.pdf} component={PuppeeterPage} />
        <Route path={routes.login} component={LoginLayout} />
        <PrivateRouter path={routes.account} component={LkWrapper} />
        <Route path={routes.smspassword} component={SmsPassword} />
        <Route path={routes.regsuccess} component={RegSuccess} />
      </Switch>
    </Router>
  );
};
