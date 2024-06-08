import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { NotesContext } from '../context/NotesContext';


const HomeScreen = ({navigation}) => {
 const {loading, error, notes, getNotes} = useContext(NotesContext)
  useEffect(() => {
    getNotes();
  }, []); 

  if (loading) {
    return (
      <Container style={{marginTop:"10rem"}}>
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

  const handleViewAllNotes = () => {
    navigation.navigate('Notes')
  };
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
      </NoteCard>
    );
  };
  
  return (
    <Container>
      <Banner>
        <BannerText>Welcome to Note App</BannerText>
      </Banner>

      <FlatList
        data={notes.slice(6).reverse()}
        renderItem={renderNote}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        ListHeaderComponent={<SectionTitle>Last 4 Notes</SectionTitle>}
        ListFooterComponent={
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <TouchableOpacity onPress={handleViewAllNotes}>
              <FooterText>View All Notes</FooterText>
            </TouchableOpacity>
          </View>
        }
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Banner = styled.View`
  background-color: #87CEEB; 
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  align-items: center;
  height:100px;
  text-align: center;
  justify-content: center;
`;

const BannerText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
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
const FooterText = styled.Text`
  font-size: 16px;
  color: #007bff; /* Blue */
`;

export default HomeScreen;
