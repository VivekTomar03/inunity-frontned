
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Platform, Dimensions, Text } from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
const { width, height } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthContext';


export default function SignUpScreen({ navigation }) {
  const { register ,  setLoading, loading} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  const handleSignUpPress = () => {
    navigation.navigate('SignIn'); 
  };
  const handleSignUp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
      return;
    }
    if (!password || !name) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Please Fill All Details',
        text2: '',
      });
      return;
    }
    setLoading(true);
   
    register(name , email, password)
      .then((res) => {
        setLoading(false);
        Toast.show({
          type: 'success',
          text1:  res?.message
        });
        navigation.navigate('SignIn'); 
       
      })
      .catch(error => {
       setLoading(false);
       Toast.show({
        type: 'error',
        text1:  "Something Went Wrong"
      });
      });
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
        <Title>Sign Up</Title>
        <Input placeholder="Name" value={name} onChangeText={setName} />
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <StyledButton disabled={loading} title="Sign Up" onPress={handleSignUp} />
        <Text style={{ marginTop: 10 }}>Already have an account? <Text style={{ color: 'blue' }} onPress={handleSignUpPress}>Sign In</Text></Text>
      </AuthContainer>
    </Container>
    </LinearGradient>
  );
}
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  
`;

const AuthContainer = styled.View`
  width: ${Platform.OS === 'web' ? width * 0.35 : width * 0.8}px;
   height: ${Platform.OS === 'web' ? height * 0.8 : height * 0.4}px;
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