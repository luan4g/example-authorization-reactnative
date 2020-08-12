import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/auth';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  function handleSignIn() {
    signIn();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignIn}>
        <Text style={styles.text}>Sing In</Text>
      </TouchableOpacity>
    </View>
    )
  }
  
export default SignIn;

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