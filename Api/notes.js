import axios from 'axios';

// const API_URL = 'https://inunity-backend.onrender.com';
const API_URL = 'http://192.168.29.166:8080';

export const getNotes = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createNote = async (noteData, token) => {
  try {
    const response = await axios.post(`${API_URL}/notes/create`, noteData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateNote = async (noteId, noteData, token) => {
  try {
    const response = await axios.put(`${API_URL}/notes/${noteId}`, noteData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteNote = async (noteId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
