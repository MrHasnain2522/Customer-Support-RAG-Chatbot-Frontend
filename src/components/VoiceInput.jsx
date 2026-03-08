/**
 * Voice Input Component
 * Microphone button with recording animation
 */
import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaStop, FaSpinner } from 'react-icons/fa';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import speechService from '../services/speechService';

const VoiceInput = ({ onTranscript, onError }) => {
  const [status, setStatus] = useState('idle'); // idle, recording, processing
  const [debugInfo, setDebugInfo] = useState('');
  
  const {
    isRecording,
    error: recordError,
    isSupported,
    startRecording,
    stopRecording,
  } = useSpeechRecognition();

  // Check service on mount
  useEffect(() => {
    const checkService = async () => {
      const available = await speechService.checkAvailability();
      console.log('🔍 STT Service available:', available);
      if (!available) {
        setDebugInfo('⚠️ Backend STT service not reachable');
      }
    };
    checkService();
  }, []);

  /**
   * Handle microphone button click
   */
  const handleVoiceInput = async () => {
    console.log('═══════════════════════════════════════');
    console.log('🔘 VOICE BUTTON CLICKED');
    console.log('Current status:', status);
    console.log('Is recording:', isRecording);
    console.log('API URL:', process.env.REACT_APP_API_URL || 'NOT SET');
    console.log('═══════════════════════════════════════');
    
    try {
      if (!isSupported()) {
        const errorMsg = 'Your browser does not support audio recording';
        console.error('❌', errorMsg);
        onError?.(errorMsg);
        return;
      }

      if (isRecording) {
        console.log('⏹️ STOP BUTTON CLICKED - Processing recording...');
        setStatus('processing');
        setDebugInfo('Processing...');
        
        // Stop recording and get audio blob
        console.log('1️⃣ Stopping recording...');
        const audioBlob = await stopRecording();
        console.log('✅ Recording stopped successfully');
        console.log('Audio blob:', {
          size: audioBlob.size,
          type: audioBlob.type,
          sizeInKB: (audioBlob.size / 1024).toFixed(2) + ' KB'
        });
        
        // Check if blob has data
        if (audioBlob.size === 0) {
          throw new Error('No audio data recorded. Please speak while recording.');
        }

        setDebugInfo(`Sending ${(audioBlob.size / 1024).toFixed(2)} KB to backend...`);
        
        console.log('2️⃣ Calling speechService.transcribeAudio...');
        
        // Send to backend for transcription
        const transcription = await speechService.transcribeAudio(audioBlob);
        
        console.log('✅ TRANSCRIPTION RECEIVED:', transcription);
        setDebugInfo('Transcription received!');
        
        // Pass transcription to parent
        if (transcription && transcription.trim()) {
          console.log('✅ Passing transcription to parent:', transcription);
          onTranscript(transcription);
          setDebugInfo('Success!');
        } else {
          console.warn('⚠️ Empty transcription received');
          onError?.('No speech detected. Please try again.');
          setDebugInfo('No speech detected');
        }
        
        setStatus('idle');

      } else {
        console.log('🎤 START BUTTON CLICKED - Starting recording...');
        setStatus('recording');
        setDebugInfo('Recording...');
        await startRecording();
        console.log('✅ Recording started successfully');
      }

    } catch (err) {
      console.error('═══════════════════════════════════════');
      console.error('❌ VOICE INPUT ERROR:');
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      console.error('═══════════════════════════════════════');
      
      setStatus('idle');
      setDebugInfo('Error: ' + err.message);
      onError?.(err.message || 'Failed to process voice input');
    }
  };

  // Check for recording errors
  useEffect(() => {
    if (recordError) {
      console.error('❌ Recording error from hook:', recordError);
      onError?.(recordError);
      setDebugInfo('Recording error: ' + recordError);
    }
  }, [recordError, onError]);

  return (
    <div style={{ position: 'relative' }}>
      <button
        className={`voice-input-button ${status}`}
        onClick={handleVoiceInput}
        disabled={status === 'processing'}
        title={
          status === 'recording' 
            ? 'Click to stop recording' 
            : status === 'processing'
            ? 'Processing...'
            : 'Click to start recording'
        }
      >
        {status === 'processing' ? (
          <FaSpinner className="voice-icon spinning" />
        ) : status === 'recording' ? (
          <>
            <FaStop className="voice-icon" />
            <span className="recording-pulse"></span>
          </>
        ) : (
          <FaMicrophone className="voice-icon" />
        )}
        
        {status === 'recording' && (
          <span className="recording-indicator">Recording...</span>
        )}
      </button>
      
      {/* Debug info - remove in production */}
      {debugInfo && (
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#333',
          color: '#fff',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          whiteSpace: 'nowrap',
          zIndex: 1000
        }}>
          {debugInfo}
        </div>
      )}
    </div>
  );
};

export default VoiceInput;