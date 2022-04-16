import React, { useContext, useReducer } from 'react';
import { landingTextsStyles } from '../../../../../utils';
import { Input } from '../../../../../components/input';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../../../../components/button';
import style from './style.module.scss';
import { loginSvg } from '../../../../../components/icons';
import { routes } from '../../../../../utils/routes';
import { ItemWithCaption } from '../../../../../components/item-with-caption';
import InputMask from 'react-input-mask';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';
import {
  requiredEmail,
  requiredString,
} from '../../../../../pages/landing-page/components/form/utils/validator';
import { requests } from '../../../../../utils/axios';
import { AppContext } from '../../../../../store/reducer';
import { userActionTypes } from '../../../../../store/types';
import { useHistory } from 'react-router';

export function Login() {
  const {
    register,
    control,
    formState: { errors, isDirty },
    handleSubmit,
    setError,
  } = useForm({
    resolver: yupResolver(
      object({
        email: requiredEmail,
        // password: requiredString,
      })
    ),
  });

  const { dispatch } = useContext(AppContext);
  const history = useHistory();

  const submit = async (fields) => {
    try {
      const { data } = await requests.login(fields);
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify({ user: data.user, orders: data.orders }));
      dispatch({ type: userActionTypes.LOGIN, payload: { ...data } });
      history.push(routes.account);
    } catch (e) {
      const errorMessage = e.response.data.message;
      Object.keys(fields).forEach((key) => setError(key, { message: errorMessage }));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <ItemWithCaption caption={'Введите почту:'}>
          <Input name={'email'} register={register} error={errors.email?.message} />
        </ItemWithCaption>
        <div className={style.phoneInput}>
          <ItemWithCaption caption={'Введите пароль:'}>
            <Input
              register={register}
              name={'password'}
              type="password"
              error={errors.password?.message}
            />
          </ItemWithCaption>
        </div>
        <Button className={style.enterBtn} disabled={!isDirty} onClick={handleSubmit(submit)}>
          Войти
        </Button>
        <div>
          <p className={landingTextsStyles.Subtitle2}>Еще не использовали наш сервис?</p>
          <Button to={routes.signup} className={style.linkBtn} appearance={'transparent'}>
            Зарегистрироваться
          </Button>
        </div>
      </div>
      <div className={style.svg}>
        <img src={loginSvg} alt="svg" />
      </div>
    </div>
  );
}
