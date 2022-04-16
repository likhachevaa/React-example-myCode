import React, { useContext, useEffect } from 'react';
import style from './style.module.scss';
import classNames from 'classnames';
import { landingTextsStyles } from '../../../utils/index';
import { HistoryCard } from './components/lk-history-card';
import { AppContext } from '../../../store/reducer';
import { userActionTypes } from '../../../store/types';
import { requests } from '../../../utils/axios';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router';
import { routes } from '../../../utils/routes';
import { Link as LinkRouter } from 'react-router-dom';
import { Button } from '../../../components/button';

export const LkHistory = () => {
  const history = useHistory();
  const {
    dispatch,
    state: { user },
  } = useContext(AppContext);
  const updateHistorty = async (id) => {
    const { data } = await requests.getUser(id);
    dispatch({ type: userActionTypes.UPDATE_ORDERS_STATUS, payload: { ...data.data.orders } });
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = jwtDecode(token).id;
    const interval = setInterval(() => {
      updateHistorty(id);
      clear();
    }, 2000);
    function clear() {
      if (state.orders.every((order_ready) => order_ready == true));
      else clearInterval(interval);
    }
  }, []);

  const { state } = useContext(AppContext);
  return (
    <>
      <div className={style.container}>
        <div className={style.header}>
          <h2 className={classNames(landingTextsStyles.h2, style.titleH2)}>История отчетов</h2>
        </div>
        {state.orders.length !== 0 ? (
          <>
            <div className={style.list}>
              <div className={style.title}>
                <div className={style.description1}>
                  <h2 className={classNames(landingTextsStyles.h3, style.textDesc)}>
                    Анализируемый товар
                  </h2>
                </div>
              </div>
              <div className={style.title}>
                <div className={style.description2}>
                  <h2 className={classNames(landingTextsStyles.h3, style.textDesc)}>Дата/время</h2>
                </div>
              </div>
              <div className={style.title}>
                <div className={style.description}></div>
              </div>
            </div>
            {state.orders.map(({ product, date, id, order_ready }, i) => (
              <HistoryCard
                className={style.historyCard}
                key={`${i}-${product}`}
                title={product}
                date={date}
                id={id}
                order_ready={order_ready}
              />
            ))}
          </>
        ) : (
          <h2 className={classNames(landingTextsStyles.h3, style.textDesc, style.emptyMsg)}>
            Вы еще не заказывали отчетов
          </h2>
        )}
        <div className={style.buttonGroup}>
          <LinkRouter to="/order">
            <Button
              className={classNames(style.btn, style.orderBtn)}
              onClick={() => history.push(routes.order)}
            >
              Проанализировать товар
            </Button>
          </LinkRouter>
        </div>
      </div>
    </>
  );
};
