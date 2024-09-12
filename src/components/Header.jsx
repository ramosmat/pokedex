import React from 'react';
import styles from './Header.module.css';
import Arrow from '../assets/arrow.svg?react';

const Header = () => {
  return (
    <div className={styles.headerBg}>
      <div className={`${styles.header} container`}>
        <h1>Pokedex</h1>
        <a
          href="https://portfolio-six-green-64.vercel.app"
          className={styles.dev}
          target="_blank"
        >
          <h3>dev</h3>
          <Arrow className={styles.arrow} />
        </a>
      </div>
    </div>
  );
};

export default Header;
