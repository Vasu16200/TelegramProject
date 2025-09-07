import React, {  useRef, useState } from "react";
import { Icons } from "../../Images/Icons";
import styles from "./VideoUploader.module.css";

const VideoUploader = ({ onVideoSelected ,videoBase64}) => {
  const inputVideoRef = useRef(null);
  const [videoPreview, setVideoPreview] = useState(null);


   

  const handleIconClick = () => {
    inputVideoRef.current.click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (onVideoSelected) onVideoSelected(reader.result);
      };
    }
  };
  const clearVideo = () => {
    setVideoPreview(null);
    if (inputVideoRef.current) {
      inputVideoRef.current.value = null;
    }
    if (onVideoSelected) {
      onVideoSelected(null);
    }
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputVideoRef}
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={handleVideoChange}
      />

      {videoPreview && videoBase64 && (
        <video width="320" height="240" controls>
          <source src={videoPreview} type="video/mp4"  />
          Your browser does not support the video tag.
        </video>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div onClick={handleIconClick} style={{ cursor: "pointer" }}>
          <Icons.CameraAltIcon />
        </div>
        {videoPreview && videoBase64 &&  (
          <button onClick={clearVideo} className={styles.clearButton}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
