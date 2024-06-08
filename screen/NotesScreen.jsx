import React, { useState } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import styled from 'styled-components/native';

const NotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null); // For editing existing notes

  // Function to add a new note
  const handleAddNote = () => {
    // Implement logic to add a new note
    console.log('Adding a new note');
    setModalVisible(true);
  };

  // Function to save a note (for new note or editing existing note)
  const handleSaveNote = () => {
    // Implement logic to save the note
    console.log('Saving note:', selectedNote);
    setModalVisible(false);
  };

  return (
    <View>
    <Text>Notes Screen</Text>
  </View>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const NotesList = styled.View`
  margin-top: 20px;
`;

const NoteItem = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NoteText = styled.Text``;

const EditButton = styled.Text`
  color: blue;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

export default NotesScreen;
