import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

const EmptyDataMessage = ({btn}) => {
  const navigation = useNavigation();

  const handleCreateNote = () => {
    navigation.navigate('Notes'); 
  };

  return (
    <Container>
         <EmptyImage source={{ uri: 'https://i.pinimg.com/564x/bb/b0/1f/bbb01f2b7947e577a24cf70ba985f4b4.jpg' }} />
      <Message >No notes available</Message>
      {btn && <CreateNoteButton onPress={handleCreateNote}>
        <ButtonText>Create Note</ButtonText>
      </CreateNoteButton>}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top:${Platform.OS==="web" ? "150px":"50px"};
`;

const EmptyImage = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

const Message = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
 
`;

const CreateNoteButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export default EmptyDataMessage;
