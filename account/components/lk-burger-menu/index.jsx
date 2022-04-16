import React from 'react';
import style from './style.module.scss';
import { crossSvg } from '../../../components/icons';
import { SideMenuOpened } from '../../../components/side-menu-opened';

export const BurgerMenuLk = ({ setIsMenuOpen }) => {
  return (
    <div className={style.modalWrapper}>
      <div className={style.modalImg} onClick={() => setIsMenuOpen((prevState) => !prevState)}>
        <img src={crossSvg} alt="cross" />
      </div>
      {/* <SideMenuOpened /> */}
    </div>
  );
};
