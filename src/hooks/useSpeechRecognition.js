/**
 * Custom Hook for Speech Recognition
 * Handles audio recording using MediaRecorder API
 */
import { useState, useRef, useCallback } from 'react';

const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  /**
   * Check if browser supports audio recording
   */
  const isSupported = useCallback(() => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }, []);

  /**
   * Start recording audio
   */
  const startRecording = useCallback(async () => {
    try {
      setError(null);
      audioChunksRef.current = [];

      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        } 
      });
      
      streamRef.current = stream;

      // Create MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') 
        ? 'audio/webm' 
        : 'audio/mp4';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      // Collect audio chunks
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Start recording
      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);

    } catch (err) {
      console.error('Error starting recording:', err);
      
      if (err.name === 'NotAllowedError') {
        setError('Microphone permission denied. Please allow access.');
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found. Please connect a microphone.');
      } else {
        setError('Failed to start recording. Please try again.');
      }
      
      setIsRecording(false);
    }
  }, []);

  /**
   * Stop recording and return audio blob
   */
  const stopRecording = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!mediaRecorderRef.current || !isRecording) {
        reject(new Error('No active recording'));
        return;
      }

      const mediaRecorder = mediaRecorderRef.current;

      mediaRecorder.onstop = () => {
        // Create blob from chunks
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: mediaRecorder.mimeType 
        });

        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }

        setIsRecording(false);
        setIsProcessing(false);
        resolve(audioBlob);
      };

      mediaRecorder.onerror = (err) => {
        console.error('MediaRecorder error:', err);
        setError('Recording error occurred');
        setIsRecording(false);
        setIsProcessing(false);
        reject(err);
      };

      // Stop recording
      setIsProcessing(true);
      mediaRecorder.stop();
    });
  }, [isRecording]);

  /**
   * Cancel recording without saving
   */
  const cancelRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      audioChunksRef.current = [];
      setIsRecording(false);
      setIsProcessing(false);
      setError(null);
    }
  }, [isRecording]);

  return {
    isRecording,
    isProcessing,
    error,
    isSupported,
    startRecording,
    stopRecording,
    cancelRecording,
  };
};

export default useSpeechRecognition;