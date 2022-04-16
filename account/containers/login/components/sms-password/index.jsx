import React, { useEffect, useState } from 'react';
import { landingTextsStyles } from '../../../../../utils';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Button } from '../../../../../components/button';
import { smsSvg, logoSvg } from '../../../../../components/icons';
import style from './style.module.scss';
import { SMSCodeInput } from '../../../../../components/sms-code-input';

export function SmsPassword(props) {
  const { register } = useForm();
  const [count, setCount] = useState(30);

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
    } else {
      setCount(0);
    }
  });

  return (
    <>
      <div className={style.wrapperLogo}>
        <div className={style.logo}>
          <img src={logoSvg} alt="logo" />
        </div>
        <h2 className={landingTextsStyles.h2}> Храните все отчеты в личном кабинете!</h2>
      </div>

      <div className={style.container}>
        <div className={style.formContainer}>
          <p className={landingTextsStyles.Subtitle1}>Введите полученный код из SMS:</p>
          <SMSCodeInput />
          <div className={style.btnAccept}>
            <Button className={style.btn}>Подтвердить</Button>
          </div>
          <p className={landingTextsStyles.Subtitle2}>Отправить новый код через: {count}</p>
          <div className={style.btnLink}>
            <Button disabled={count > 0} className={style.linkBtn} appearance={'transparent'}>
              Отправить
            </Button>
          </div>
        </div>
        <div className={style.svg}>
          <img src={smsSvg} alt="svg" />
        </div>
      </div>
    </>
  );
}
