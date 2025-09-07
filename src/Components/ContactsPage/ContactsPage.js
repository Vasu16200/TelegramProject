import React from "react";
import styles from "./ContactsPage.module.css";


const ContactsPage = ({ contacts, messages, onContactClick,onBack,filteredContacts}) => {
     
 
 
  return (
    <div className={styles.container}>
   
      <div className={styles.contactList}
       
      >
        {filteredContacts.length > 0 ?
         (
          filteredContacts.map((contact) => (
            
            
            <div key={contact.id} className={styles.contactCard} onClick={() => onContactClick(contact) }  >
              <div className={styles.contactName}><strong>{contact.name}</strong></div>
              <div className={styles.contactNumber}>{contact.mobile}</div>
              <div className={styles.contactMessage}>{contact.lastMessage}</div>
             
            </div>
          ))
        ) : (
          <p className={styles.empty}>No contacts available</p>
        )}
      </div>
    </div>
  );
};

export default ContactsPage;
