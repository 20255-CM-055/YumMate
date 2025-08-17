

// // ------------------------


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
    navigation.navigate('MainTabs', { userEmail: email });
  };

  const handleGoogleLogin = () => {
    Alert.alert(
      'Trouble continuing with Google',
      'Please proceed with the login'
    );
  };

  return (
    <ImageBackground
      source={require('../assets/bg111.jpeg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Let's start with{'\n'}Login!</Text>

          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="User name"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
              <Text style={styles.mainButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
            >
              <Ionicons name="logo-google" size={18} color="#23c34eff" />
              <Text style={styles.googleButtonText}>Login with Google</Text>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity>
            <Text style={styles.forgot}>forget password?</Text>
          </TouchableOpacity> */}

          <View style={styles.bottomLinkContainer}>
            <Text style={styles.bottomText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.bottomHighlight}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 25
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 15
  },
  input: {
    backgroundColor: '#fffdfdff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    paddingBottom: 25,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: 'gray',
    borderWidth: 1
  },
  mainButton: {
    backgroundColor: '#111',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#fff5f5',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  googleButtonText: {
    color: '#23c34eff',
    fontSize: 15,
    fontWeight: '500'
  },
  forgot: {
    textAlign: 'center',
    color: '#000000ff',
    marginBottom: 25,
    fontSize: 18,
  },
  bottomLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomText: {
    color: '#222222ff'
  },
  bottomHighlight: {
    color: '#111',
    fontWeight: '900',
    fontSize: 16,
  }
});


// ---------------------------

