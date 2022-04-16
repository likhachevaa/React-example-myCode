import React, { useContext, useState } from 'react';
import { Input } from '../../../../../components/input';
import { Button } from '../../../../../components/button';
import { routes } from '../../../../../utils/routes';
import { Controller, useForm } from 'react-hook-form';
import style from './style.module.scss';
import { signupSvg } from '../../../../../components/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object } from 'yup';
import {
  requiredEmail,
  requiredMessage,
  requiredString,
} from '../../../../../pages/landing-page/components/form/utils/validator';
import { ItemWithCaption } from '../../../../../components/item-with-caption';
import InputMask from 'react-input-mask';
import { requests } from '../../../../../utils/axios';
import { Checkbox } from '../../../../../components/checkbox';
import { PolicyModal } from '../../../../../pages/landing-page/components/policy-modal';
import { useHistory } from 'react-router';
import classNames from 'classnames';

export function Signup() {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    register,
    control,
    formState: { errors, isDirty },
    handleSubmit,
    setError,
  } = useForm({
    resolver: yupResolver(
      object({
        name: requiredString,
        email: requiredEmail,
        phone: requiredString,
        checkboxes: object({
          agreement: boolean().oneOf([true], requiredMessage),
        }),
      })
    ),
  });

  const submit = async (fields) => {
    try {
      const { data } = await requests.createUser(fields);
      const { accessToken } = data;
      if (accessToken) {
        await requests.createSubscription(accessToken);
      }
      history.push(routes.regsuccess);
    } catch (e) {
      const errorMessage = e.response.data.message;
      setError('email', { message: errorMessage });
    }
  };
  return (
    <>
      <PolicyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      <div className={style.container}>
        <div className={style.formContainer}>
          <div className={style.input}>
            <ItemWithCaption caption={'Как вас зовут?'}>
              <Input
                register={register}
                name={'name'}
                placeholder={'Петр Иванов'}
                error={errors.name?.message}
              />
            </ItemWithCaption>
          </div>
          <div className={style.input}>
            <ItemWithCaption caption={'Введите почту:'}>
              <Input
                name={'email'}
                register={register}
                placeholder={'name@gmail.com'}
                error={errors.email?.message}
              />
            </ItemWithCaption>
          </div>
          <div className={style.input}>
            <ItemWithCaption caption={'Введите номер телефона:'}>
              <Controller
                control={control}
                name={'phone'}
                render={({ field: { onChange, value } }) => (
                  <InputMask mask={'+7 ( 999 ) 999 - 99 - 99'} value={value} onChange={onChange}>
                    {(inputProps) => (
                      <Input
                        name={'phone'}
                        register={register}
                        placeholder={'+7 ( ___ ) ___ - __ - __'}
                        error={errors.phone?.message}
                        {...inputProps}
                      />
                    )}
                  </InputMask>
                )}
              />
            </ItemWithCaption>
            <div className={style.CheckboxWrapper}>
              <Checkbox
                register={register}
                name={'checkboxes.news'}
                label={'Я хочу получать новости от сервиса'}
              />
              <Checkbox
                register={register}
                name={'checkboxes.agreement'}
                error={errors.checkboxes?.agreement?.message}
                label={
                  <>
                    {`Я принимаю `}
                    <a onClick={() => setIsModalVisible(true)}>Политику конфиденциальности</a>
                  </>
                }
              />
            </div>
          </div>
          <div className={style.btnReg}>
            <Button className={style.btn} disabled={!isDirty} onClick={handleSubmit(submit)}>
              Регистрация
            </Button>
            <Button
              className={classNames(style.btn, style.btnBack)}
              onClick={() => history.push(routes.login)}
            >
              Назад
            </Button>
          </div>
        </div>
        <div className={style.svg}>
          <img src={signupSvg} alt="svg" />
        </div>
      </div>
    </>
  );
}
