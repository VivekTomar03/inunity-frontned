import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, registerUser } from '../Api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setUser({ token });
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const register = async (name , email, password) => {
    const response = await registerUser(name , email, password);
    return response;
  };

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    const { token, userData } = response;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('userData', JSON.stringify({name:userData.name, email:userData.email}));

    setUser({ token, ...userData });
    return response
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
