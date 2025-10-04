import React  from "react";
import styles from "./SlideBar.module.css";
import { Icons } from "../../Images/Icons/";

const Sidebar = ({isOpen,toggleSidebar}) => {
 

  return (
    <div className={styles.container}>
      {/* Menu Button */}
      <button className={styles.menuButton} onClick={toggleSidebar}>
        <Icons.MenuIcon/>
      </button>

      {/* Sidebar (popup list) */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <button className={styles.closeBtn} onClick={toggleSidebar}>✖</button>
        <ul className={styles.menuList}>
          
          <li><span><Icons.AccountCircleIcon/>My Profile</span></li>
          <li><span><Icons.AccountBoxIcon/> Contacts</span></li>
          <li ><span><Icons.CallIcon/>Calls</span></li>
          <li><span><Icons.SettingsIcon/>Settings</span></li>
          <li><span><Icons.GroupAddIcon/>Invite Friends</span></li>
        </ul>
      </div>

      {/* Optional overlay background */}
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
