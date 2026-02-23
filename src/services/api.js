import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const sendMessage = async (message, userId, conversationId = null) => {
  try {
    const response = await api.post('/chat', {
      message,
      user_id: userId,
      conversation_id: conversationId,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getConversationHistory = async (conversationId) => {
  try {
    const response = await api.get(`/conversations/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error;
  }
};

export const getUserConversations = async (userId) => {
  try {
    const response = await api.get(`/conversations/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user conversations:', error);
    throw error;
  }
};

export const getKnowledgeBaseStats = async () => {
  try {
    const response = await api.get('/knowledge-base/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching KB stats:', error);
    throw error;
  }
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export default api;