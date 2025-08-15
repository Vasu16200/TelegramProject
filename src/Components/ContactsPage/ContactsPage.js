import React, { useEffect, useState } from "react";
import styles from "./ContactsPage.module.css";
import { useNavigate } from 'react-router-dom';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [messageError, setMessageError] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/v1/contacts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Contacts fetched:", data);
        setContacts(data);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
        setError("Failed to load contacts");
      })
      .finally(() => setLoading(false));
  }, []);
    //normal methhod
    //   const handleClick = () => {
    //   console.log("button clicked")  
      
    //   navigate('/listofcontacts'); // Replace '/target-page' with your desired route
    // };

    //logic method 
   const handleClick = async (e, contact) => {
  e.preventDefault();
  console.log("button clicked for:", contact.mobile);

  try {
    const mobileNumber = contact.mobile;
    const url = `http://localhost:8080/v1/messages/`+mobileNumber;
    const res = await fetch(url , {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    //if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    if (!res.ok) {
        if (res.status === 404) {
          setMessageError(`No messages found for ${mobileNumber}`);
        } else {
          setMessageError(`Server error: ${res.status}`);
        }
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

    const data = await res.json();
    
    console.log("Messages API response:", data);
    if (data.mobile === contact.mobile) {
      console.log("✅ Mobile numbers match");
      navigate('/listofcontacts', { state: { contact, messages: data.messages } });
    } else {
      console.log("❌ Mobile numbers do not match");
    }
  } catch (err) {
    console.error("Error fetching messages:", err);
  }
};


     

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.header}>Your Contacts</h2> */}

      <div className={styles.contactList}>
        {messageError && <p className={styles.error}>{messageError}</p>}
        {loading && <p>Loading contacts...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact.id} className={styles.contactCard}>
              <div className={styles.contactName}>
                <strong>{contact.name}</strong>
              </div>
              <div className={styles.contactNumber}>{contact.mobile}</div>
              <div className={styles.contactMessage}>{contact.lastMessage}</div>
              <button className={styles.onClick}  onClick={(e)=>handleClick(e,contact)}></button>
            </div>
          ))
        ) : (
          !loading && !error && <p className={styles.empty}>No contacts available</p>
        )}
      </div>
    </div>
  );
};

export default ContactsPage;
