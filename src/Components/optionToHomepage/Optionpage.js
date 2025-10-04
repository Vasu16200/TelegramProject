import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Optionpage.module.css'

const Optionpage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/homepages');
  };

  return (
    <div className={styles.container}>
      <p className={styles.note}>
        <b>Note:</b> This page is under construction. If you want to see how this website works, 
        just click the button, which will redirect you to the home page.
      </p>

      <button className={styles.button} onClick={handleClick}>
        Click Me!
      </button>
    </div>
  );
};

export default Optionpage;
