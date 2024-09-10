import React from 'react';
import styles from './Header.module.css';
import Arrow from '../assets/arrow.svg?react';

const Header = () => {
  return (
    <div className={styles.headerBg}>
      <div className={`${styles.header} container`}>
        <h1>Pokedex</h1>
        <div className={styles.dev}>
          <h3>dev</h3>
          <Arrow className={styles.arrow} />
        </div>
      </div>
    </div>
  );
};

export default Header;
