import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobileNumber: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNumberChange = (event) => {
    const { name, value } = event.target;
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // API Call
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: formData.email, mobileNumber: formData.mobileNumber }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Server Response:", data);
        setSuccess("Signup successful!");
        
       
        navigate("/otpform", { state: { email: formData.email, mobileNumber: formData.mobileNumber } });
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Signup failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Sign Up</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleNumberChange}
            required
            placeholder="Enter your mobile number"
            maxLength="10"
            pattern="\d{10}"
            title="Mobile number must be exactly 10 digits"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        {loading && <p>Submitting...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
