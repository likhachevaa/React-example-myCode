import React from "react";
import style from "./style.module.scss";
import classNames from "classnames";
import { FormContextProvider } from "../../../../../contexts/orderFormContext";
import { logoSvg } from "../../../../../components/icons";
import { landingTextsStyles } from "../../../../../utils";
import { Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { Login, Signup, SmsPassword } from "../../index";
import { RegSuccess } from "../../components/reg-success";
import { useHistory } from "react-router";
import { routes } from "../../../../../utils/routes";

export function LoginLayout() {
  const history = useHistory();

  let { path } = useRouteMatch();

  return (
    <FormContextProvider>
      <div className={style.container}>
        <div
          className={style.logo}
          onClick={() => history.push(routes.homePage)}
        >
          <img src={logoSvg} alt="logo" />
        </div>
        <h2 className={classNames(landingTextsStyles.h2, style.titleH2)}>
          Храните все отчеты в личном кабинете!
        </h2>
        <div className={style.mainContent}>
          <div className={style.formContainer}>
            <Switch>
              <Route exact path={path} component={Login} />
              <Route path={`${path}/signup`} component={Signup} />
              <Route path={`${path}/smspassword`} component={SmsPassword} />
              <Route path={`${path}/regsuccess`} component={RegSuccess} />
            </Switch>
          </div>
        </div>
      </div>
    </FormContextProvider>
  );
}
