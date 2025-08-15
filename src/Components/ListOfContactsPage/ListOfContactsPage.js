import React, { useEffect, useState } from "react";
import styles from "./ListOfContactsPage.module.css";

const ListOfContactsPage = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [messageText, setMessageText] = useState(""); // New state for input

  useEffect(() => {
    fetch("http://localhost:8080/v1/messages/+1-202-555-0143", {
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
        console.log("Messages API data:", data);
        setContact(data);
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages");
      })
      .finally(() => setLoading(false));
  }, []);

  
  const handleSendMessage = () => {
    if (!messageText.trim()) return; 
    console.log("Sending message:", messageText);

    const newMessage = {
      id: Date.now(),
      sender: "You",
      message: messageText,
      time: new Date().toISOString()
    };
    setContact((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    setMessageText(""); // Clear input

    // TODO: Send to backend with fetch POST request
    /*
    fetch(`http://localhost:8080/v1/messages/${contact.mobile}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messageText })
    })
    .then(res => res.json())
    .then(data => console.log("Message sent", data))
    .catch(err => console.error("Send failed", err));
    */
  };

  if (loading) {
    return <p className={styles.loading}>Loading messages...</p>;
  }
  if (error) {
    return <p className={styles.error}>{error}</p>;
  }
  if (!contact) {
    return <p className={styles.empty}>No contact found</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Chat with {contact.name}</h2>

     
      <div className={styles.chatBox}>
        {contact.messages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.sender === "You"
                ? styles.messageOutgoing
                : styles.messageIncoming
            }
          >
            <div className={styles.sender}>{msg.sender}</div>
            <div className={styles.text}>{msg.message}</div>
            <div className={styles.time}>
              {new Date(msg.time).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      
      <div className={styles.inputBar}>
        <input
          type="text"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className={styles.input}
        />
        <button onClick={handleSendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ListOfContactsPage;
