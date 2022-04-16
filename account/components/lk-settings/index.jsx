import React, { useContext, useEffect, useState } from 'react';
import style from './style.module.scss';
import { landingTextsStyles } from '../../../utils';
import classNames from 'classnames';
import { formStepOneSvg, editSvg, eyeSvg, okSvg } from '../../../components/icons';
import { Button } from '../../../components/button';
import { ItemWithCaption } from '../../../components/item-with-caption';
import { Input } from '../../../components/input';
import { Controller, get, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { requests } from '../../../utils/axios';
import { AppContext } from '../../../store/reducer';
import { userActionTypes } from '../../../store/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object } from 'yup';
import { requiredString } from '../../../pages/landing-page/components/form/utils/validator';
import { useHistory } from 'react-router';
import { routes } from '../../../utils/routes';

export function LkSettings({ visibleClass, setVisibleClass }) {
  const history = useHistory();
  const rootClasses = [style.container];
  if (visibleClass) {
    rootClasses.push(style.containerMenu);
  }
  const [settingsActive, setSettingsActive] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const {
    state: { user },
    dispatch,
  } = useContext(AppContext);
  const submitUser = async (fields) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await requests.updateUser({
          ...fields,
          accessToken: token,
        });
        dispatch({ type: userActionTypes.UPDATE_USER, payload: fields });
        setSettingsActive(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const submitPassword = async (fields) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await requests.updateUser({
          name: user.name,
          phone: user.phone,
          password: fields.password,
          accessToken: token,
        });
        setPasswordEditMode(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const showOrHidePassword = () => {
    const password = document.getElementById('password');
    if (password.type === 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  };

  const {
    register,
    control,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(
      object({
        name: string()
          .required('Это поле обязательно для заполнения')
          .matches(/^[а-яА-Я-a-zA-Zё]+$/gi, 'Поле может содержать только буквы'),
      })
    ),
    phone: requiredString,
  });
  useEffect(() => {
    setValue('phone', user.phone);
    setValue('name', user.name);
  }, [user.phone, user.name]);
  return (
    <div className={rootClasses.join(' ')}>
      <div className={style.header}>
        <h2 className={classNames(landingTextsStyles.h2, style.titleH2)}>Настройки</h2>
        <p className={classNames(landingTextsStyles.Subtitle2, style.textHello)}>
          Личная информация
        </p>
      </div>
      <div className={style.content}>
        {settingsActive ? (
          <div className={style.profile}>
            <div className={style.mainMenu}>
              <div className={style.formContainer}>
                <div className={style.input}>
                  <ItemWithCaption caption={'Ваше имя'}>
                    <Input register={register} name={'name'} error={errors?.name?.message} />
                  </ItemWithCaption>
                </div>
                <div className={style.input}>
                  <ItemWithCaption caption={'Телефон'}>
                    <Controller
                      control={control}
                      name={'phone'}
                      render={({ field: { onChange, value } }) => (
                        <InputMask
                          mask={'+7 ( 999 ) 999 - 99 - 99'}
                          value={value}
                          onChange={onChange}
                        >
                          {(inputProps) => (
                            <Input
                              name={'phone'}
                              register={register}
                              error={errors.phone?.message}
                              {...inputProps}
                            />
                          )}
                        </InputMask>
                      )}
                    />
                  </ItemWithCaption>
                </div>
              </div>
            </div>
            <div className={style.buttonsGroup}>
              <Button
                className={classNames(style.linkBtn, style.saveButton)}
                appearance={'transparent'}
                onClick={handleSubmit(submitUser)}
                disabled={!isDirty}
              >
                <img className={style.okImg} src={okSvg} alt="" />
                Сохранить
              </Button>
              <div className={style.divCancel}>
                <Button
                  className={classNames(style.linkBtn, style.btn2)}
                  appearance={'transparent'}
                  onClick={() => setSettingsActive(false)}
                >
                  Отменить
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className={style.profile}>
            <article>
              <span className={landingTextsStyles.p}>Ваше имя</span>
              <h2 className={landingTextsStyles.Subtitle2}>{user.name}</h2>
              <div className={style.phoneTitle}>
                <span className={landingTextsStyles.p}>Телефон</span>
                <h2 className={landingTextsStyles.Subtitle2}>
                  {user.phone ? user.phone : 'Вы не указали номер телефона'}
                </h2>
              </div>
            </article>
            <Button
              className={classNames(style.linkBtn, style.editButton)}
              appearance={'transparent'}
              onClick={() => setSettingsActive(true)}
            >
              <img className={style.changeImg} src={editSvg} alt="svg" />
              Изменить личные данные
            </Button>
            {passwordEditMode ? (
              <div className={style.inputPass}>
                <ItemWithCaption caption={'Новый пароль'}>
                  <Input id="password" register={register} name={'password'} type="password" />
                </ItemWithCaption>
                <div className={style.buttonsGroup}>
                  <Button
                    className={classNames(style.linkBtn, style.saveButton)}
                    appearance={'transparent'}
                    onClick={handleSubmit(submitPassword)}
                    disabled={!isDirty}
                  >
                    <img className={style.okImg} src={okSvg} alt="" />
                    Сохранить
                  </Button>
                  <div className={style.divCancel}>
                    <Button
                      className={classNames(style.linkBtn, style.btn2)}
                      appearance={'transparent'}
                      onClick={() => setPasswordEditMode(false)}
                    >
                      Отменить
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p className={classNames(landingTextsStyles.Subtitle2, style.textSettings)}>
                  Настройки аккаунта
                </p>
                <Button
                  appearance={'transparent'}
                  className={style.linkBtn}
                  onClick={() => setPasswordEditMode(true)}
                >
                  Задать свой пароль
                </Button>
                <Button
                  className={classNames(style.btn, style.btnBack)}
                  onClick={() => history.push(routes.account)}
                >
                  Назад
                </Button>
              </>
            )}
          </div>
        )}
        <div className={style.imgSettings}>
          <img src={formStepOneSvg} alt="svg" />
        </div>
      </div>
    </div>
  );
}
