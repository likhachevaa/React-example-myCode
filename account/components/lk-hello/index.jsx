import React, { useContext } from 'react';
import style from './style.module.scss';
import { landingTextsStyles } from '../../../utils';
import classNames from 'classnames';
import { lkHello } from '../../../components/icons';
import { Button } from '../../../components/button';
import { Link as LinkRouter } from 'react-router-dom';
import { useHistory } from 'react-router';
import { routes } from '../../../utils/routes';
import { AppContext } from '../../../store/reducer';

export function LkHello({ visibleClass, setVisibleClass }) {
  const rootClasses = [style.containerHello];
  if (visibleClass) {
    rootClasses.push(style.containerHelloMenu);
  }
  const { state } = useContext(AppContext);
  const history = useHistory();
  return (
    <div className={rootClasses.join(' ')}>
      <div className={style.info}>
        <div className={style.header}>
          <h2 className={classNames(landingTextsStyles.h2, style.titleH2)}>
            Добро пожаловать {'\n'} в личный кабинет!
          </h2>
          <p className={classNames(landingTextsStyles.Subtitle2, style.textHello)}>
            Вы можете настроить свой личный профиль,{'\n'} а также отслеживать историю отчетов.
          </p>
        </div>
        <div className={style.imgHello}>
          <img src={lkHello} alt="" />
        </div>
        <LinkRouter to="/order">
          <Button
            className={style.btn}
            disabled={!state.user.reportsAvailable}
            onClick={() => history.push(routes.order)}
          >
            Проанализировать товар
          </Button>
        </LinkRouter>
      </div>
    </div>
  );
}
