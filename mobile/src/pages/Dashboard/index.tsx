import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <Text>{user?.name}</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>
    </View>
    )
  }
  
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    color: '#00fa'
  }
})