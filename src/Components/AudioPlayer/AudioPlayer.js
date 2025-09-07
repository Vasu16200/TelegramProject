import React, { useState, useRef, useEffect } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import { Icons } from "../../Images/Icons";
import styles from './AudioPlayer.module.css';

const Mp3Recorder = ({ onAudioRecorded,pendingAudio }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null); 
  const recorder = useRef(new MicRecorder({ bitRate: 128 }));

  // Cleanup object URL on unmount or URL change to avoid memory leaks
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = () => {
    recorder.current.start().then(() => setIsRecording(true))
      .catch(e => alert('Could not start recording: ' + e));
  };

  const stopRecording = () => {
    recorder.current.stop().getMp3()
      .then(([buffer, blob]) => {
        setIsRecording(false);

  
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          if (onAudioRecorded) {
            onAudioRecorded(reader.result);  // full base64 data URI sent to parent
          }
        };
      })
      .catch(e => {
        setIsRecording(false);
        alert('Error stopping: ' + e);
      });
  };
     const handleClearAudio = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    if (onAudioRecorded) {
      onAudioRecorded(null);
      
      // send null to notify no audio
    }
    // if(pendingAudio){
    //   pendingAudio(null)
    // }
  };

  return (
    <div className={styles.container}>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording
          ? <div className={styles.pauseIcons}><Icons.PauseIcon /></div>
          : <div className={styles.voiceIcon}><Icons.KeyboardVoiceIcon/></div>
        }
        
      </button>

      
      {audioUrl && pendingAudio && (
        <>
        <audio controls src={audioUrl}   />
        <button onClick={handleClearAudio} className={styles.clear   }  ><Icons.DeleteForeverIcon/> </button>
        </>
      )}
      
    </div>
  );
};

export default Mp3Recorder;
