import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const VideoFeedSocketIO = () => {
  const videoRef = useRef<HTMLImageElement>(null);
  const [plateText, setPlateText] = useState<string>("No plate detected");

  useEffect(() => {
    const socket = io('http://192.168.75.245:5000'); // Connect to your Flask backend

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    socket.on('video_frame', (data: { frame: string; plate_text: string }) => {
      if (videoRef.current) {
        videoRef.current.src = `data:image/jpeg;base64,${data.frame}`;
      }
      setPlateText(data.plate_text);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md"></div>
      <h1>Real-time Number Plate Detection</h1>
      <img ref={videoRef} width="640" height="480" alt="Live Video Feed"  className='border border-gray-300 rounded-md'/>
      <p>Detected Plate: {plateText}</p>
    </div>
  );
};

export default VideoFeedSocketIO;
