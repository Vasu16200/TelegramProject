import React, { useEffect, useState } from "react";
import ContactsPage from "../../Components/ContactsPage/ContactsPage";
import { Icons } from "../../Images/Icons";
import styles from "./HomePage.module.css";
import MessagePage from "../../Components/MessagePage/MessagePage";


function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resContacts = await fetch("http://localhost:8080/v1/contacts");
        if (!resContacts.ok) throw new Error("Failed to fetch contacts");
        const contactsData = await resContacts.json();
        setContacts(contactsData);

        let allMessages = {};
        for (let contact of contactsData) {
          const res = await fetch(
            `http://localhost:8080/v1/messages/${contact.mobile}`
          );
          if (res.ok) {
            const msgData = await res.json();
            allMessages[contact.mobile] = msgData.messages || [];
          }
        }
        setMessages(allMessages);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleContactSelect = (contact) => {
    if (selectedContact && selectedContact.id !== contact.id) {
      handleBack();
    }
    setSelectedContact(contact);
  };

  const handleBack = () => {
    setSelectedContact(null);
  };

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);
    
  //   setFilteredContacts(
  //     contacts.filter((contact) =>
  //       contact.name.toLowerCase().includes(value.toLowerCase())
  //     )
  //   );
  // };

     function handleChange(e){
        const value=e.target.value;
        setSearchTerm(value);
        setFilteredContacts(
          contacts.filter((contact)=>
          contact.name.toLowerCase().includes(value.toLowerCase())
        )
        )
    
   }

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      {/* Header */}
      {/* <div className={styles.header}>
        <div className={styles.menuIcon}><Icons.MenuIcon /></div>
        <div className={styles.title}>
          <Icons.TelegramIcon className={styles.telegramLogo} /> Telegram
        </div>
        <div className={styles.searchIcon}><Icons.SearchIcon /></div>
      </div> */}

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.leftPane}>
          <div className={styles.header}>
            <div className={styles.menuIcon}>
              <Icons.MenuIcon />
            </div>
            <div className={styles.title}>
              <Icons.TelegramIcon className={styles.telegramLogo} /> Telegram
            </div>
            <div className={styles.searchFolder}>
              <form action="">
                <input
                  type="search"
                  name="contactName"
                  id="contactName"
                  placeholder="search here.."
                  value={searchTerm}
                  onChange={handleChange}
                />
              </form>

              {/* Show the filtered contacts only when there's a search term */}
              {searchTerm && (
                <ul>
                  {filteredContacts.map((contact) => (
                    <li key={contact.id}>{contact.name}</li>
                  ))}
                </ul>
              )}

              <div className={styles.searchIcon}>
                <Icons.SearchIcon />
              </div>
            </div>
          </div>

          <ContactsPage
            contacts={contacts}
            setSelectedContact={setSelectedContact}
            messages={messages}
            onContactClick={handleContactSelect}
            onBack={handleBack}
            onChange={handleChange}
            filteredContacts={filteredContacts}
            searchTerm={searchTerm}
          />
        </div>
        <div className={styles.rightPane}>
          {selectedContact ? (
            <>
              {/* <button onClick={handleBack} className={styles.backButton}>
                Back to Contacts
              </button> */}

              <h2 className={styles.header}>
                <div className={styles.leftSection}>
                  <div className={styles.accountIcon}>
                    <Icons.AccountBoxIcon />
                  </div>
                  <div className={styles.accountInfo}>
                    <span className={styles.name}>
                      Chat with {selectedContact.name}
                    </span>

                    <span className={styles.num}>{selectedContact.mobile}</span>
                  </div>
                </div>
                <div className={styles.rightSection}>
                  <div className={styles.callIcon}>
                    <Icons.CallIcon />
                  </div>
                  <div className={styles.searchIcon}>
                    <Icons.SearchIcon />
                  </div>
                  <div className={styles.dotIcon}>
                    <Icons.MoreVertIcon />
                  </div>
                </div>
              </h2>
              
              <MessagePage
                contact={selectedContact}
                messages={messages[selectedContact.mobile] || []}
                onBack={handleBack} //back button
              />
            </>
          ) : (
            <p className={styles.empty}>Select a contact to view messages</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
