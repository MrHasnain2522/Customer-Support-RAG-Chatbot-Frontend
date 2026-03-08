/**
 * Speech-to-Text Service
 * Handles communication with backend STT API
 */
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class SpeechService {
  /**
   * Transcribe audio file to text using backend API
   * @param {Blob} audioBlob - Audio recording blob
   * @returns {Promise<string>} - Transcribed text
   */
  async transcribeAudio(audioBlob) {
    console.log('📡 SpeechService.transcribeAudio called');
    console.log('📦 Audio blob details:', {
      size: audioBlob.size,
      type: audioBlob.type
    });

    try {
      // Validate blob
      if (!audioBlob || audioBlob.size === 0) {
        throw new Error('Audio blob is empty or invalid');
      }

      // Create FormData to send audio file
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      console.log('📤 Sending request to:', `${API_BASE_URL}/api/stt/transcribe`);
      console.log('📋 FormData created with audio file');

      // Send to backend STT endpoint
      const response = await axios.post(
        `${API_BASE_URL}/api/stt/transcribe`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000, // 30 second timeout
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`📊 Upload progress: ${percentCompleted}%`);
          }
        }
      );

      console.log('✅ Response received:', response.status, response.statusText);
      console.log('📥 Response data:', response.data);
      console.log('🔍 Full response object:', JSON.stringify(response.data, null, 2));

      // Extract transcription - CHECK ALL POSSIBLE FIELDS
      let transcription = null;
      
      // Try different possible field names
      if (response.data) {
        transcription = response.data.transcription || 
                       response.data.text || 
                       response.data.result ||
                       response.data.transcript;
      }
      
      console.log('📝 Extracted transcription:', transcription);
      console.log('📝 Transcription type:', typeof transcription);

      if (!transcription || transcription === '') {
        console.error('❌ No transcription in response. Full data:', response.data);
        console.error('❌ Available keys:', Object.keys(response.data));
        throw new Error('No transcription received from server');
      }

      console.log('✅ Transcription successful:', transcription);
      return transcription.trim();

    } catch (error) {
      console.error('❌ Speech transcription error:', error);
      
      // Handle specific error cases
      if (error.response) {
        // Server responded with error
        console.error('❌ Server error response:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });
        
        const errorMessage = error.response.data.error || 
                            error.response.data.message || 
                            error.response.data.detail ||
                            `Server error: ${error.response.status}`;
        throw new Error(`Transcription failed: ${errorMessage}`);
        
      } else if (error.request) {
        // Request made but no response
        console.error('❌ No response from server');
        console.error('Request details:', error.request);
        throw new Error('No response from server. Check if backend is running on ' + API_BASE_URL);
        
      } else {
        // Other errors
        console.error('❌ Error:', error.message);
        throw new Error(`Transcription error: ${error.message}`);
      }
    }
  }

  /**
   * Check if STT service is available
   * @returns {Promise<boolean>}
   */
  async checkAvailability() {
    try {
      console.log('🔍 Checking STT service availability...');
      const response = await axios.get(`${API_BASE_URL}/api/stt/health`, {
        timeout: 5000
      });
      console.log('✅ STT service is available:', response.data);
      return response.data.status === 'ok' || response.status === 200;
    } catch (error) {
      console.error('❌ STT service check failed:', error.message);
      return false;
    }
  }

  /**
   * Get supported audio formats
   * @returns {Array<string>}
   */
  getSupportedFormats() {
    return ['webm', 'wav', 'mp3', 'ogg'];
  }
}

// Create instance and export
const speechServiceInstance = new SpeechService();
export default speechServiceInstance;