import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, ActivityIndicator, Platform } from 'react-native';
import styled from 'styled-components/native';
import { NotesContext } from '../context/NotesContext';
import ColorPicker from 'react-native-wheel-color-picker';

const NotesScreen = () => {
  const { getNotes, createNote, updateNote, deleteNote, notes, loading, error } = useContext(NotesContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [noteData, setNoteData] = useState({ title: '', description: '', color: '' });
  const [selectedNote, setSelectedNote] = useState(null); 
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const handleSaveNote = async () => {
    if (selectedNote) {
      await updateNote(selectedNote._id, noteData);
    } else {
     
      await createNote(noteData);
    }
    setModalVisible(false);
    setNoteData({ title: '', description: '', color: '' });
    setSelectedNote(null);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setNoteData(note);
    setModalVisible(true);
  };

  const handleDeleteNote = async (noteId) => {
    await deleteNote(noteId);
  };

  if (loading) {
    return (
      <Container style={{ marginTop: '10rem' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text>{error}</Text>
      </Container>
    );
  }

  const renderNote = ({ item }) => {
    const formattedCreatedAt = new Date(item.createdAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ' ' + new Date(item.createdAt).toLocaleTimeString('en-US', { hour12: true });

    const formattedUpdatedAt = new Date(item.updatedAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ' ' + new Date(item.updatedAt).toLocaleTimeString('en-US', { hour12: true });

    return (
      <NoteCard backgroundColor={item.color}>
        <NoteTitle>{item.title}</NoteTitle>
        <NoteDescription>{item.description}</NoteDescription>
        <NoteDates>
          <Text>Created: {formattedCreatedAt}</Text>
          <Text>Updated: {formattedUpdatedAt}</Text>
        </NoteDates>
        <Actions>
          <TouchableOpacity onPress={() => handleEditNote(item)}>
            <EditButton>Edit</EditButton>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteNote(item._id)}>
            <DeleteButton>Delete</DeleteButton>
          </TouchableOpacity>
        </Actions>
      </NoteCard>
    );
  };

  return (
    <Container>
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item._id}
      />
      <AddButtonContainer>
        <TouchableOpacity onPress={() => {
          setShowColorPicker(false)
           setSelectedNote(null)
           setNoteData({ title: '', description: '', color: '' });
          setModalVisible(true)
        }}>
          <AddButton>Add Note</AddButton>
        </TouchableOpacity>
      </AddButtonContainer>
      <Modal style={{width:"100%"}} visible={modalVisible} transparent={true}>
        <ModalContainer>
          <ModalContent>
            <TextInput
             style={styles.input}
              placeholder="Title"
              value={noteData.title}
              onChangeText={(text) => setNoteData({ ...noteData, title: text })}
            />
            <TextInput
             style={styles.input}
              placeholder="Description"
              value={noteData.description}
              onChangeText={(text) => setNoteData({ ...noteData, description: text })}
            />
            <Button title="Pick Color" onPress={() => setShowColorPicker(true)} />
            {showColorPicker && (
              <ColorPicker
                color={noteData.color}
                onColorChange={(color) => setNoteData({ ...noteData, color })}
                style={{ height: 200, width: 200 ,margin:"auto" }}
              />
            )}
            <Button style={{marhinTop:10}} title="Save Note" onPress={handleSaveNote} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

const styles = {
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    padding: 8,
  },
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const NoteCard = styled.View`
  background-color: ${(props) => props.backgroundColor || 'lightgrey'};
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const NoteTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const NoteDescription = styled.Text`
  font-size: 14px;
  margin-bottom: 5px;
`;

const NoteDates = styled.View`
  margin-top: 5px;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const EditButton = styled.Text`
  background-color: #007bff;
  color: white;
  padding: 5px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.Text`
  background-color: #dc3545;
  color: white;
  padding: 5px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #c82333;
  }
`;

const AddButtonContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;

const AddButton = styled.Text`
  color: #007bff; /* Blue */
  font-size: 16px;
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
  width: 90%;
  max-width: 400px;
  height:${Platform.OS==="web" ? "auto":"80%"};
  gap:10px
  `
  

export default NotesScreen;
