import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [formData, setFormData] = useState({ mobileNumber: "" });
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // }; method for normal enter

  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleResendOtp = () => {
    console.log("Resending OTP...");
    setTimer(60);
    setCanResend(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp);
    if (otp.length === 6) {
      navigate("/contactspage");
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            maxLength="10"
            pattern="\d{10}"
            title="Please enter exactly 10 digits"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter OTP"
          />
        </div>

        <button
          type="button"
          className={styles.resendBtn}
          onClick={handleResendOtp}
          disabled={!canResend}
        >
          {canResend ? "Resend OTP" : `Resend in ${timer}s`}
        </button>

        <button type="submit" className={styles.submitBtn}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
