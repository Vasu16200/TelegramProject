import React, { useEffect, useState } from "react";
import styles from "./MessagePage.module.css";
import Mp3Recorder from "../AudioPlayer";
import FileUploader from "../FileUploader/FileUploader";
import { Icons } from "../../Images/Icons";
import VideoUploader from "../VideoUploader";

// Helper for rendering base64 attachments as download links
const getBase64Url = (file) => file.base64;
const formatSize = (bytes) => (bytes / 1024).toFixed(1); // KB

const MessagePage = ({ contact, messages, onBack }) => {
  const [chatMessages, setChatMessages] = useState(messages || []);
  const [messageText, setMessageText] = useState("");
  const [pendingAudio, setPendingAudio] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [videoBase64, setVideoBase64] = useState(null);

  useEffect(() => {
    setChatMessages(messages || []);
  }, [messages, contact]);

  const handleSendAudioMessage = (audioBase64) => {
    if (audioBase64 === null) setPendingAudio(null);
    else if (audioBase64) setPendingAudio(audioBase64);
  };

  const handleFilesSelected = (files) => {
    setSelectedFiles(files); // [{ name, type, size, base64 }, ...] or null
    console.log("Selected files:", files);
  };

  const handleVideoSelected = (base64Video) => {
    setVideoBase64(base64Video);
    console.log("Selected video base64:", base64Video);
  };

  const handleSendMessage = async () => {
    const audioToSend = pendingAudio;
    const textToSend = messageText.trim();
    const filesToSend = selectedFiles;
    const videoToSend = videoBase64;

    if (!contact || !contact.mobile) {
      alert("Contact is missing");
      return;
    }

    if (
      !audioToSend &&
      !textToSend &&
      !(filesToSend && filesToSend.length > 0) &&
      !videoToSend
    ) {
      console.log(
        "Please enter message, record audio or select files/video before sending."
      );
      return;
    }

    let newMessage = {
      id: Date.now(),
      sender: "You",
      time: new Date().toISOString(),
    };
    if (audioToSend) newMessage.audio = audioToSend;
    if (textToSend) newMessage.message = textToSend;
    if (filesToSend && filesToSend.length > 0) newMessage.files = filesToSend;
    if (videoToSend) newMessage.base64Video = videoToSend;

    setChatMessages((prev) => [...prev, newMessage]);

    // Clear inputs
    setPendingAudio(null);
    setMessageText("");
    setSelectedFiles(null);
    setVideoBase64(null);

    // Example POST (send all message data as JSON, including base64 files)
    try {
      await fetch(`http://localhost:8080/v1/messages/${contact.mobile}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });
    } catch (err) {
      console.error("Message send failed", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.sender === "You"
                ? styles.messageOutgoing
                : styles.messageIncoming
            }
          >
            <div className={styles.sender}>{msg.sender}</div>
            {msg.audio ? (
              <audio controls src={msg.audio} />
            ) : msg.base64Video ? (
              <video controls src={msg.base64Video} />
            ) : (
              <div className={styles.text}>{msg.message}</div>
            )}

            {msg.files &&
              msg.files.map((f, idx) => (
                <div key={idx} className={styles.attachments}>
                  <a
                    href={getBase64Url(f)}
                    download={f.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <Icons.CloudDownloadIcon className={styles.atIcon} />
                    {f.name} ({formatSize(f.size)} KB)
                  </a>
                </div>
              ))}
            <div className={styles.time}>
              {new Date(msg.time).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.inputBar}>
        <div className={styles.audioIcon}>
          <Mp3Recorder onAudioRecorded={handleSendAudioMessage} pendingAudio={pendingAudio}/>
        </div>
        <div className={styles.fileUploader}>
          <FileUploader
            onFilesSelected={handleFilesSelected}
            selectedFiles={selectedFiles}
          />
        </div>
        <div className={styles.videoUploader}>
          <VideoUploader onVideoSelected={handleVideoSelected}  videoBase64={videoBase64} setVideoBase64={setVideoBase64}  />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className={styles.input}
          />
          <button onClick={handleSendMessage} className={styles.sendButton}>
            <Icons.SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
