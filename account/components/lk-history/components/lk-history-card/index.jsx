import React, { useCallback } from 'react';
import style from './style.module.scss';
import { downloadLk } from '../../../../../components/icons';
import moment from 'moment';
import { axiosCreate } from '../../../../../utils/axios';
import md5 from 'md5';
import classNames from 'classnames';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const HistoryCard = ({ title, date, id, order_ready }) => {
  const productDate = moment(date).format('MM.DD.YYYY / HH:mm');
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const downloadHandler = useCallback(() => {
    const idWithSecret = '****' + id;
    const skey = md5(idWithSecret);
    axiosCreate
      .post(
        '/report/preview',
        {
          order_id: id,
          skey,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(({ data }) => window.location.replace(data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className={style.list}>
        <div className={style.title}>
          <div className={classNames(style.description, style.orderTitle)}>{title}</div>
        </div>
        <div className={style.title}>
          <div className={classNames(style.description, style.orderData)}>{productDate}</div>
        </div>
        <div className={style.title}>
          <div className={classNames(style.description, style.orderSvg)}>
            {order_ready ? (
              <div onClick={downloadHandler}>
                <img src={downloadLk} alt={'link'} />
              </div>
            ) : (
              <Spin indicator={antIcon} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default HistoryCard;
