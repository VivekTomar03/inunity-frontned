import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthContext } from './AuthContext'; 
import { getNotes as getNotesApi, createNote as createNoteApi, updateNote as updateNoteApi, deleteNote as deleteNoteApi } from '../Api/notes'; 

// Initial state for notes
const initialState = {
  loading: false,
  error: null,
  notes: [],
};

// Action types
const actionTypes = {
  GET_NOTES_REQUEST: 'GET_NOTES_REQUEST',
  GET_NOTES_SUCCESS: 'GET_NOTES_SUCCESS',
  GET_NOTES_FAILURE: 'GET_NOTES_FAILURE',
  CREATE_NOTE_REQUEST: 'CREATE_NOTE_REQUEST',
  CREATE_NOTE_SUCCESS: 'CREATE_NOTE_SUCCESS',
  CREATE_NOTE_FAILURE: 'CREATE_NOTE_FAILURE',
  UPDATE_NOTE_REQUEST: 'UPDATE_NOTE_REQUEST',
  UPDATE_NOTE_SUCCESS: 'UPDATE_NOTE_SUCCESS',
  UPDATE_NOTE_FAILURE: 'UPDATE_NOTE_FAILURE',
  DELETE_NOTE_REQUEST: 'DELETE_NOTE_REQUEST',
  DELETE_NOTE_SUCCESS: 'DELETE_NOTE_SUCCESS',
  DELETE_NOTE_FAILURE: 'DELETE_NOTE_FAILURE',
};

// Reducer function to manage state updates
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_NOTES_REQUEST:
    case actionTypes.CREATE_NOTE_REQUEST:
    case actionTypes.UPDATE_NOTE_REQUEST:
    case actionTypes.DELETE_NOTE_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.GET_NOTES_SUCCESS:
      return { ...state, loading: false, notes: action.payload };
    case actionTypes.CREATE_NOTE_SUCCESS:
      return { ...state, loading: false, notes: [...state.notes, action.payload] };
    case actionTypes.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: state.notes.map((note) => (note._id === action.payload._id ? action.payload : note)),
      };
    case actionTypes.DELETE_NOTE_SUCCESS:
      return { ...state, loading: false, notes: state.notes.filter((note) => note._id !== action.payload) };
    case actionTypes.GET_NOTES_FAILURE:
    case actionTypes.CREATE_NOTE_FAILURE:
    case actionTypes.UPDATE_NOTE_FAILURE:
    case actionTypes.DELETE_NOTE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);
export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useContext(AuthContext); 
  const getNotes = async () => {
    dispatch({ type: actionTypes.GET_NOTES_REQUEST });
    try {
      const notes = await getNotesApi(user.token);
      dispatch({ type: actionTypes.GET_NOTES_SUCCESS, payload: notes });
    } catch (error) {
      dispatch({ type: actionTypes.GET_NOTES_FAILURE, payload: error.message });
    }
  };

  // Function to create a note
  const createNote = async (noteData) => {
    dispatch({ type: actionTypes.CREATE_NOTE_REQUEST });
    try {
      const newNote = await createNoteApi(noteData, user.token);
      dispatch({ type: actionTypes.CREATE_NOTE_SUCCESS, payload: newNote });
    } catch (error) {
      dispatch({ type: actionTypes.CREATE_NOTE_FAILURE, payload: error.message });
    }
  };

  // Function to update a note
  const updateNote = async (noteId, noteData) => {
    dispatch({ type: actionTypes.UPDATE_NOTE_REQUEST });
    try {
      const updatedNote = await updateNoteApi(noteId, noteData, user.token);
      dispatch({ type: actionTypes.UPDATE_NOTE_SUCCESS, payload: updatedNote });
    } catch (error) {
      dispatch({ type: actionTypes.UPDATE_NOTE_FAILURE, payload: error.message });
    }
  };

  // Function to delete a note
  const deleteNote = async (noteId) => {
    dispatch({ type: actionTypes.DELETE_NOTE_REQUEST });
    try {
      await deleteNoteApi(noteId, user.token);
      dispatch({ type: actionTypes.DELETE_NOTE_SUCCESS, payload: noteId });
    } catch (error) {
      dispatch({ type: actionTypes.DELETE_NOTE_FAILURE, payload: error.message });
    }
  };

  useEffect(() => {
    // Fetch notes when the user changes
    if (user?.token) {
      getNotes();
    }
  }, [user]);

  return (
    <NotesContext.Provider value={{ ...state, getNotes, createNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};
