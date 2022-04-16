import React from 'react';
import { Button } from '../../../../../components/button';
import style from './style.module.scss';
import { landingTextsStyles } from '../../../../../utils';
import { routes } from '../../../../../utils/routes';
import { successSvg, logoSvg } from '../../../../../components/icons';
import { useHistory } from 'react-router';

export function RegSuccess() {
  const history = useHistory();
  return (
    <>
      <div className={style.logo}>
        <img src={logoSvg} alt="logo" />
      </div>
      <div className={style.container}>
        <div className={style.headerSuccess}>
          <h2 className={landingTextsStyles.h2}>Регистрация прошла успешно!</h2>
        </div>
        <div className={style.content}>
          <p className={landingTextsStyles.p}>
            Спасибо, что выбрали наш сервис!{'\n'}
            Вы можете начать работу с личным кабинетом.
          </p>
        </div>
        <Button className={style.btn} to={routes.account}>
          Начать работу
        </Button>
        <div className={style.svg}>
          <img src={successSvg} alt="svg" />
        </div>
        <p className={landingTextsStyles.p}>Хотите начать работу позже?</p>
        <Button
          onClick={() => history.push(routes.homePage)}
          className={style.linkBtn}
          appearance={'transparent'}
        >
          Вернуться к началу
        </Button>
      </div>
    </>
  );
}
