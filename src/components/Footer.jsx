import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <section className={styles.footerBg}>
      <footer className={styles.footer}>
        <h3 className={styles.mensagem}>
          Estou disponível para novos projetos no momento. Entre em contato
          comigo e marcamos uma conversa 👋
        </h3>
        <div className={styles.contato}>
          <h3>Contato</h3>
          <ul className={styles.firstUl}>
            <li>matheusramosbi.13@gmail.com</li>
            <li>
              <a
                href="https://www.linkedin.com/in/matheus-ramos-amaral-00880314b/"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a
                href="https://portfolio-six-green-64.vercel.app"
                target="_blank"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a href="https://github.com/ramosmat" target="_blank">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
