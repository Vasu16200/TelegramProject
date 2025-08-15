import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './OtpForm.module.css';

const OtpForm = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();  // To get email from Signup page

  const email = location.state?.email || ''; // email passed from Signup component

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false; // only numbers
    setOtp(otp.map((data, idx) => (idx === index ? element.value : data)));

    // Move to next input if filled
    if (element.value !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (element, index) => {
    if (
      element.key === 'Backspace' &&
      element.target.value === '' &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      alert('Please enter all 6 digits of the OTP');
      return;
    }

    setLoading(true);
    setError('');

    fetch('http://localhost:8080/signup/validate-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        otp: enteredOtp,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('OTP Validation Response:', data);
        alert(data.message); 
        navigate('/homepages');
      })
      .catch((err) => {
        console.error('Error validating OTP:', err);
        setError('Invalid OTP or server error. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Enter OTP</h1>
      {email && <p className={styles.emailHint}>OTP sent to: {email}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.otpBox}>
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className={styles.otpInput}
            />
          ))}
        </div>

        {loading && <p>Validating OTP...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpForm;
