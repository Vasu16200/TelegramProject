
import React, { useState } from "react";
import SignUp from "../../Components/SignUpPage/SignUp";
import Login from "../../Components/LoginPage/Login";
import styles from "../../Pages/AuthenticationPage/AuthenticationPage.module.css"
import Optionpage from "../../Components/optionToHomepage/Optionpage";

export default function AuthenticationPage() {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome</h1>

      
      <div className={styles.tabs}>
        <button
          className={activeTab === "signup" ? styles.active : ""}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </button>
        <button
          className={activeTab === "login" ? styles.active : ""}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
      </div>

      <div className={styles.formWrapper}>
        {activeTab === "signup" ? <SignUp /> : <Login />}
      </div>
      
    </div>

    <div>
        <Optionpage/>
      </div>
      </>
  );
}
