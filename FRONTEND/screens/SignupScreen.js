


// // -------------------------------

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   ImageBackground,
//   Alert
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons } from '@expo/vector-icons';

// export default function SignupScreen({ navigation }) {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async () => {
//     if (!username || !email || !password) {
//       Alert.alert('Error', 'All fields are required');
//       return;
//     }

//     try {
//       // Store user details in AsyncStorage
//       await AsyncStorage.setItem('userName', username);
//       await AsyncStorage.setItem('userEmail', email);
//       await AsyncStorage.setItem('userPassword', password); // Not secure, for demo only

//       Alert.alert('Success', 'Account created!');

//       // Navigate to MainTabs with username
//       navigation.replace('MainTabs', { userName: username });

//     } catch (error) {
//       console.error('Error saving user data:', error);
//       Alert.alert('Error', 'Failed to save account details.');
//     }
//   };

//   const handleGoogleRegister = () => {
//     Alert.alert(
//       'Trouble with Google',
//       'Unable to continue with Google. Please proceed with manual signup.'
//     );
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/bg111.jpeg')}
//       style={styles.bg}
//       resizeMode="cover"
//     >
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           keyboardShouldPersistTaps="handled"
//         >
//           <Text style={styles.title}>Let's start with{'\n'}register!</Text>

//           {/* Form Card */}
//           <View style={styles.card}>
//             <TextInput
//               style={styles.input}
//               placeholder="User name"
//               placeholderTextColor="#999"
//               value={username}
//               onChangeText={setUsername}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Your email"
//               placeholderTextColor="#999"
//               keyboardType="email-address"
//               value={email}
//               onChangeText={setEmail}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor="#999"
//               secureTextEntry
//               value={password}
//               onChangeText={setPassword}
//             />

//             <TouchableOpacity style={styles.mainButton} onPress={handleSignup}>
//               <Text style={styles.mainButtonText}>Register</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.googleButton}
//               onPress={handleGoogleRegister}
//             >
//               <Ionicons name="logo-google" size={18} color="#23c34eff" />
//               <Text style={styles.googleButtonText}>Register with Google</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.bottomLinkContainer}>
//             <Text style={styles.bottomText}>Already have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//               <Text style={styles.bottomHighlight}>Login</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   bg: { flex: 1, width: '100%', height: '100%' },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 25
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#111',
//     textAlign: 'center',
//     marginBottom: 20
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 5 },
//     shadowRadius: 10,
//     elevation: 3,
//     marginBottom: 15,
//     height: 350
//   },
//   input: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     marginBottom: 12,
//     paddingBottom: 25,
//     borderColor: 'gray',
//     borderWidth: 0.2
//   },
//   mainButton: {
//     backgroundColor: '#111',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 10
//   },
//   mainButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600'
//   },
//   googleButton: {
//     flexDirection: 'row',
//     backgroundColor: '#fff5f5',
//     borderRadius: 8,
//     paddingVertical: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8
//   },
//   googleButtonText: {
//     color: '#23c34eff',
//     fontSize: 15,
//     fontWeight: '500'
//   },
//   bottomLinkContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 15
//   },
//   bottomText: { color: '#242424ff' },
//   bottomHighlight: {
//     color: '#111',
//     fontWeight: '900',
//     fontSize: 16
//   }
// });


// ---------------------------------

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignup = async () => {
    if (!username || !email || !password || !phoneNumber) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (!/^\d+$/.test(phoneNumber)) {
      Alert.alert('Error', 'Phone number must contain only digits');
      return;
    }

    try {
      // Store user details in AsyncStorage
      await AsyncStorage.setItem('userName', username);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password); // Not secure, for demo only
      await AsyncStorage.setItem('userPhone', phoneNumber);

      Alert.alert('Success', 'Account created!');

      // Navigate to MainTabs with username
      navigation.replace('MainTabs', { userName: username, userPhone: phoneNumber });
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save account details.');
    }
  };

  const handleGoogleRegister = () => {
    Alert.alert(
      'Trouble with Google',
      'Unable to continue with Google. Please proceed with manual signup.'
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
          <Text style={styles.title}>Let's start with{'\n'}register!</Text>

          {/* Form Card */}
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="User name"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
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
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={15} // optional max length
            />

            <TouchableOpacity style={styles.mainButton} onPress={handleSignup}>
              <Text style={styles.mainButtonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleRegister}
            >
              <Ionicons name="logo-google" size={18} color="#23c34eff" />
              <Text style={styles.googleButtonText}>Register with Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomLinkContainer}>
            <Text style={styles.bottomText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.bottomHighlight}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
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
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 12,
    paddingBottom: 25,
    borderColor: 'gray',
    borderWidth: 0.2
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
  bottomLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },
  bottomText: { color: '#242424ff' },
  bottomHighlight: {
    color: '#111',
    fontWeight: '900',
    fontSize: 16
  }
});
