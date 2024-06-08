
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  
`;

const AuthContainer = styled.View`
  width: ${Platform.OS === 'web' ? width * 0.35 : width * 0.8}px;
   height: ${Platform.OS === 'web' ? height * 0.6 : height * 0.4}px;
  padding: ${height * 0.03}px;
  border-radius: ${height * 0.03}px;
  background-color: #fff;
  elevation: 10; 
  justify-content: center;
  diplay:flex;
  gap:${Platform.OS === 'web' ? 20 : 0}px;
`;

const Title = styled.Text`
  font-size: ${height * 0.035}px;
  font-weight: bold;
  margin-bottom: ${height * 0.02}px;
  text-align: center;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;
const StyledButton = styled.Button`
  margin-top: ${height * 0.03}px;
`;

export default function SignInScreen( {navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUpPress = () => {
    navigation.navigate('SignUp'); 
  };

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
      <AuthContainer>
        <Title>Sign In</Title>
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <StyledButton title="Sign In" onPress={() => {}} />
        <Text style={{ marginTop: 10 }}>Don't have an account? <Text style={{ color: 'blue' }} onPress={handleSignUpPress}>Sign Up</Text></Text>
      </AuthContainer>
    </Container>
    </LinearGradient>
  );
}
