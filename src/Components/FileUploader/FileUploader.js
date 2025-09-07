import React, { useRef } from "react";
import styles from "./FileUploader.module.css";
import { Icons } from "../../Images/Icons";

// Util for base64 encoding
const fileToBase64Meta = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        base64: reader.result,
      });
    };
    reader.readAsDataURL(file);
  });

function FileUploader({ onFilesSelected, selectedFiles }) {
  const inputFileRef = useRef(null);

  const handleIconClick = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const base64Files = await Promise.all(
        Array.from(files).map((file) => fileToBase64Meta(file))
      );
      onFilesSelected(base64Files);
    }
  };

  const clearFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = null;
    }
    if (onFilesSelected) {
      onFilesSelected(null);
    }
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputFileRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div onClick={handleIconClick} style={{ cursor: "pointer" }}>
        <Icons.AttachFileIcon />
      </div>
      {selectedFiles && (
        <button onClick={clearFile} className={styles.clearButton}>
          X
        </button>
      )}
    </div>
  );
}

export default FileUploader;
