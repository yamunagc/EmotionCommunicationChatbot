import React from 'react';
import { motion } from 'framer-motion';
// import './SoundWave.css'; // optional for custom styles

const bars = [1, 2, 3, 4, 5];

const SoundWave = ({ isRecording }) => {
  return (
    <div className="soundwave-container" style={{ display: 'flex', gap: '6px', height: '40px' }}>
      {bars.map((bar, index) => (
        <motion.div
          key={index}
          initial={{ height: 10 }}
          animate={{
            height: isRecording ? [10, 30, 10] : 10,
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1,
            ease: 'easeInOut'
          }}
          style={{
            width: '6px',
            backgroundColor: isRecording ? '#ff0000' : '#ccc',
            borderRadius: '3px',
          }}
        />
      ))}
    </div>
  );
};

export default SoundWave;
