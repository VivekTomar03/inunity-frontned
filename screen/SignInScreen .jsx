
import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import Toast from 'react-native-toast-message';
const { width, height } = Dimensions.get('window');


export default function SignInScreen( {navigation }) {
  const { login , setLoading, loading, user} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
   if(user?.token) {
    navigation.navigate("Main")
   }
  },[navigation, user?.token])

  const handleSignInPress = async () => {
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
    if (!password) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Please Fill All Details',
        text2: '',
      });
      return;
    }
    setLoading(true)
    try {
     let resData =  await login(email, password);
     setLoading(false)
     Toast.show({
      type: 'success',
      text1: 'Hello '+ resData?.userData?.name,
      text2:  resData?.message
    });
      navigation.navigate('Main'); 
    } catch (error) {
      setLoading(false)
      Toast.show({
        type: 'error',
        text1: "LoginFailed",
        text2:  error?.message,
      });
    }
  };
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
        <Input keyboardType="email-address" autoCapitalize="none"  placeholder="Email" value={email} onChangeText={setEmail} />
        <Input   placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <StyledButton disabled={loading} title="Sign In" onPress={handleSignInPress} />
        <Text style={{ marginTop: 10 }}>Don't have an account? <Text style={{ color: 'blue' }} onPress={handleSignUpPress}>Sign Up</Text></Text>
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
