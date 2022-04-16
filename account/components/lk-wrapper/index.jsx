import React, { useContext, useState } from 'react';
import { SideMenuOpened } from '../../../components/side-menu-opened';
import { SideMenuHidden } from '../../../components/side-menu';
import style from './style.module.scss';
import { LkHello } from '../lk-hello';
import { LkHelp } from '../lk-help';
import { LkSettings } from '../lk-settings';
import { LkHistory } from '../lk-history';
import { BurgerMenuLk } from '../lk-burger-menu';
import { ggMenu } from '../../../components/icons';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { landingTextsStyles } from '../../../utils';
import { AppContext } from '../../../store/reducer';

export const LkWrapper = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let { path } = useRouteMatch();
  const [classAdd, setClassAdd] = useState(false);
  const { state } = useContext(AppContext);
  const { user } = state;
  const subsDate = user?.subscriptionActiveUntil?.split('-').reverse().join('.');
  return (
    <div className={style.container}>
      {isMenuOpen ? (
        <SideMenuOpened setClassAdd={setClassAdd} setIsMenuOpen={setIsMenuOpen} />
      ) : (
        <SideMenuHidden setClassAdd={setClassAdd} setIsMenuOpen={setIsMenuOpen} />
      )}
      <div className={style.hamburger}>
        <div className={style.menuBtnSvg} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={ggMenu} alt="hamburger" />
        </div>
        <div className={style.modal}>
          <BurgerMenuLk setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>
      <div className={style.pageWrapper}>
        <div className={style.orderInfo}>
          <p className={landingTextsStyles.Subtitle2}>
            Доступно отчетов: <span className={style.accent}>{user.reportsAvailable}/100</span>
          </p>
          {user.subscriptionActiveUntil ? (
            <p className={landingTextsStyles.Subtitle2}>
              Подписка активна до <span className={style.accent}>{subsDate}</span>{' '}
            </p>
          ) : (
            <p className={landingTextsStyles.Subtitle2}>
              Подписка <span className={style.accent}>не активна</span>{' '}
            </p>
          )}
        </div>
        <Switch>
          <Route exact path={path}>
            <LkHello visibleClass={classAdd} setVisibleClass={setClassAdd} />
          </Route>
          <Route path={`${path}/settings`}>
            <LkSettings visibleClass={classAdd} setVisibleClass={setClassAdd} />
          </Route>
          <Route path={`${path}/archive`} component={LkHistory} />
          <Route path={`${path}/help`} component={LkHelp} />
        </Switch>
      </div>
    </div>
  );
};
