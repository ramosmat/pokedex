import React from 'react';
import styles from './Header.module.css';
import Arrow from '../assets/arrow.svg?react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className={styles.headerBg}>
      <div className={`${styles.header}`}>
        <NavLink to="/">
          <h1>Pokedex</h1>
        </NavLink>
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
