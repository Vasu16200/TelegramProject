import React from 'react';
import ContactsPage from '../../Components/ContactsPage/ContactsPage';
import ListOfContactsPage from '../../Components/ListOfContactsPage/ListOfContactsPage';
import { Icons } from '../../Images/Icons';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.container}>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.menuIcon}>
          <Icons.MenuIcon />
        </div>
        <div className={styles.title}>
          <Icons.TelegramIcon className={styles.telegramLogo} />
          Telegram
        </div>
        <div className={styles.searchIcon}>
          <Icons.SearchIcon />
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.leftPane}>
          <ContactsPage />
        </div>
        <div className={styles.rightPane}>
          <ListOfContactsPage />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
