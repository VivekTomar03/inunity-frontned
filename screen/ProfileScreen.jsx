import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <Container>
        <LoadingText>Loading...</LoadingText>
      </Container>
    );
  }

  return (
    <LinearGradient
    colors={['#ff6b6b','#ff6b6b', '#ffb6b9']}
    start={[0, 0]} 
    end={[1, 1]} 
   style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}
    >
  <Container>
      <Title>Profile</Title>
      <ProfileCard>
        <ProfileItem>
          <Label>Name:</Label>
          <Value>{userData.name}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>Email:</Label>
          <Value>{userData.email}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>Bio:</Label>
          <Value>Enthusiastic developer with a passion for creating innovative solutions.</Value>
        </ProfileItem>
      </ProfileCard>
    </Container>

    </LinearGradient>
  
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
`;

const ProfileCard = styled.View`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  elevation: 3;
`;

const ProfileItem = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const Label = styled.Text`
  font-weight: bold;
  color: #555;
  margin-right: 10px;
`;

const Value = styled.Text`
  color: #333;
`;

const LoadingText = styled.Text`
  font-size: 18px;
  color: #555;
`;

export default ProfileScreen;
