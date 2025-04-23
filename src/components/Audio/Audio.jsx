import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { audioModelAPI } from '../../services/audioapi';
import './Audio.css';
import {assets} from '../../assets/assets'
const Audiovisualizer = ({ analyser, recording }) => {
  const [levels, setLevels] = useState(new Array(16).fill(10));

  useEffect(() => {
    let animationFrameId;

    if (recording && analyser) {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateLevels = () => {
        analyser.getByteFrequencyData(dataArray);
        const newLevels = Array.from(dataArray.slice(0, 16)).map(
          (val) => (val / 255) * 40 + 5
        );
        setLevels(newLevels);
        animationFrameId = requestAnimationFrame(updateLevels);
      };

      updateLevels();
    } else {
      // Subtle idle animation using sine waves
      let t = 0;
      const idlePulse = () => {
        const newLevels = Array(16)
          .fill(0)
          .map((_, i) => 10 + Math.sin(t + i * 0.5) * 4); // soft idle wave
        setLevels(newLevels);
        t += 0.1;
        animationFrameId = requestAnimationFrame(idlePulse);
      };
      idlePulse();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [analyser, recording]);

  return (
    <div
      className="soundwave-container"
      style={{
        display: 'flex',
        gap: '6px',
        height: '60px',
        alignItems: 'center',
        marginTop: '20px',
        justifyContent:'center'
      }}
    >
      {levels.map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: h }}
          transition={{ duration: 0.2 }}
          style={{
            width: '6px',
            backgroundColor: 'grey',
            borderRadius: '3px',
            textAlign:'center'
          }}
        />
      ))}
    </div>
  );
};

const AudioPage = () => {
  const [recording, setRecording] = useState(false);
  const [analyser, setAnalyser] = useState(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 64;
    source.connect(analyserNode);
    setAnalyser(analyserNode);

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const responseAudioUrl = await audioModelAPI(blob);
      const audio = new Audio(responseAudioUrl);
      audio.play();
      setAnalyser(null);
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setRecording(false);
  };

  return (
    <div className="container">
      <div className="left-section" style={{ backgroundImage:  `url(${assets.speak})`,height:"100%"  }}></div>
       <div className='right-section'>
          <div className="audio">
          <h1 className="title">Emotional Agent</h1>

        <Audiovisualizer analyser={analyser} recording={recording} />
        <motion.div animate={{scale: [1, 1.05,1.15, 1],
          boxShadow: [
            "0 0 10px rgba(100, 100, 100, 0.3)",
            "0 0 20px rgba(100, 100, 100, 0.5)",
            "0 0 10px rgba(100, 100, 100, 0.3)",
          ],
          borderColor: recording ? "red" : "#646464", // Red when recording, gray otherwise
          background:recording?"white":"#646464",
          color:recording?"#646464":"white"
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(100, 100, 100, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            duration: 2,
            repeat: Infinity,  // Continuous breathing effect
            repeatType: "loop",
            ease: "easeInOut",
          }}
          style={{
          borderRadius: "50px",
          display: "inline-block",
          marginTop: "40px",
          cursor: "pointer",borderWidth: "2px", // Add border width to see the color change
          borderStyle: "solid", // Solid border for visibility
          }}
          className="elevated-button"
          onClick={recording ? stopRecording : startRecording}>
            {recording ? "Respond" : "Start Talking"}
          </motion.div>
      </div>
    </div>
    <div className='Emotional-meter'>
      <p>Emotion Wheel</p>
        <div className='emotional_meter_image'>
          
          <img src={assets.emotional_wheel} alt='Emotion Meter' />

        </div>
    </div>
    </div>
  );
};

export default AudioPage;
