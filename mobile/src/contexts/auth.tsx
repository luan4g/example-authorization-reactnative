import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';

interface User {
  name: string,
  email: string,
}

interface AuthContextData {
  signed: boolean,
  user: User | null,
  loading: boolean,
  signIn(): Promise<void>,
  signOut(): void,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoagind] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if(storagedUser && storagedToken) {
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

        setUser(JSON.parse(storagedUser));
        setLoagind(false);
      } else {
        setLoagind(false)
      }
    }

    loadStorageData();
  }, [])
  
  async function signIn() {
    const res = await auth.singin();
    
    setUser(res.user);

    api.defaults.headers['Authorization'] = `Bearer ${res.token}`;

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(res.user));
    await AsyncStorage.setItem('@RNAuth:token', res.token);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    })
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}