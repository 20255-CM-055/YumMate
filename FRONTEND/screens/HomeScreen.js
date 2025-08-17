

// // ------------------------------------

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useState, useCallback } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, Image } from 'react-native';
// import LottieView from 'lottie-react-native';
// import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
// import Toast from 'react-native-root-toast';
// import { useFocusEffect } from '@react-navigation/native';

// export default function HomeScreen({ navigation }) {
//   const [surpriseModalVisible, setSurpriseModalVisible] = useState(false);
//   const [infoModalVisible, setInfoModalVisible] = useState(false);
//   const [surpriseItem, setSurpriseItem] = useState('');
//   const [userName, setUserName] = useState('');

//   const tips = [
//     'Tip: Adding a pinch of salt to coffee balances bitterness ☕',
//     'Tip: Soak onions in cold water to reduce sharpness 🧅',
//     'Tip: Freeze herbs in olive oil for easy cooking later 🌿',
//     'Tip: Let meat rest before slicing to keep juices inside 🍖',
//   ];

//   const surpriseRecipes = [
//     'Pasta Primavera 🍝',
//     'Spicy Tofu Stir-fry 🌶️',
//     'Berry Smoothie 🫐',
//     'Garlic Butter Shrimp 🍤',
//     'Avocado Toast 🥑',
//   ];

//   useFocusEffect(
//     useCallback(() => {
//       const loadUserNameAndShowTip = async () => {
//         try {
//           const storedName = await AsyncStorage.getItem('userName');
//           setUserName(storedName?.trim() || 'Chef');

//           const randomTip = tips[Math.floor(Math.random() * tips.length)];
//           Toast.show(randomTip, {
//             duration: Toast.durations.LONG,
//             position: Toast.positions.BOTTOM,
//             backgroundColor: '#333',
//             textColor: '#fff',
//             shadow: true,
//             animation: true,
//           });
//         } catch (error) {
//           console.error('Error loading username:', error);
//           setUserName('Chef');
//         }
//       };

//       loadUserNameAndShowTip();
//     }, [])
//   );

//   const handleSurprise = () => {
//     const pick = surpriseRecipes[Math.floor(Math.random() * surpriseRecipes.length)];
//     setSurpriseItem(pick);
//     setSurpriseModalVisible(true);
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/homebg2.jpeg')}
//       style={styles.backgroundImage}
//       resizeMode="cover"
//     >
//       {/* Subtle animated overlay */}
//       <LottieView
//         source={require('../assets/Food Choice.json')}
//         autoPlay
//         loop
//         style={styles.backgroundAnimation}
//       />

//       <View style={styles.overlay}>
//         {/* Top bar */}
//         <View style={styles.topBar}>
//           <Text style={styles.appName}>YumMate!</Text>
//           <TouchableOpacity
//             style={styles.profileIcon}
//             onPress={() => navigation.navigate('Profile')}
//           >
//             {/* Custom image instead of user icon */}
//             <Image
//               source={require('../assets/logo.jpg')} // replace with your image
//               style={{ width: 40, height: 40, borderRadius: 18 }}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Greeting */}
//         <Text style={styles.greeting}>Hi, {userName} 👋</Text>
//         <Text style={styles.subGreeting}>Ready to cook something amazing?</Text>

//         {/* Central animation */}
//         <LottieView
//           source={require('../assets/Food Choice.json')}
//           autoPlay
//           loop
//           style={styles.animation}
//         />

//         {/* Quick Actions */}
//         <View style={styles.quickActions}>
//           <TouchableOpacity style={styles.actionButton} onPress={handleSurprise}>
//             <MaterialCommunityIcons name="star-circle" size={28} color="#fff" />
//             <Text style={styles.actionText}>Surprise Me</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => navigation.navigate('Chatbot')}
//           >
//             <MaterialCommunityIcons name="basket" size={28} color="#fff" />
//             <Text style={styles.actionText}>Use Ingredients</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => navigation.navigate('BrowseRecipes')}
//           >
//             <Feather name="book-open" size={28} color="#fff" />
//             <Text style={styles.actionText}>Browse</Text>
//           </TouchableOpacity>
//         </View>

//         {/* What's This App Button */}
//         <TouchableOpacity style={styles.button} onPress={() => setInfoModalVisible(true)}>
//           <Text style={styles.buttonText}>What’s YumMate? 🤔</Text>
//         </TouchableOpacity>

//         {/* Surprise Recipe Modal */}
//         <Modal transparent animationType="fade" visible={surpriseModalVisible}>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalBox}>
//               <Text style={styles.modalTitle}>🎯 Surprise Recipe!</Text>
//               <Text style={styles.modalText}>{surpriseItem}</Text>
//               <TouchableOpacity
//                 style={styles.closeButton}
//                 onPress={() => setSurpriseModalVisible(false)}
//               >
//                 <Text style={styles.closeButtonText}>Done!!</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//         {/* App Info Modal */}
//         <Modal transparent animationType="fade" visible={infoModalVisible}>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalBox}>
//               <Text style={styles.modalTitle}>ℹ️ About YumMate</Text>
//               <Text style={styles.modalText}>
//                 YumMate helps you discover delicious recipes, cooking tips, and the best ways to use
//                 the ingredients you already have. Whether you’re feeling adventurous or just hungry,
//                 we’ve got you covered!
//               </Text>
//               <TouchableOpacity
//                 style={styles.closeButton}
//                 onPress={() => setInfoModalVisible(false)}
//               >
//                 <Text style={styles.closeButtonText}>Got it!</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   backgroundImage: { flex: 1, width: '100%', height: '100%' },
//   backgroundAnimation: { position: 'absolute', width: '100%', height: '100%', opacity: 0.1 },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(255,255,255,0.65)',
//     paddingHorizontal: 20,
//     paddingTop: 40,
//   },
//   topBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   appName: { fontSize: 24, fontWeight: 'bold', color: '#9C27B0' },
//   profileIcon: { padding: 5 },
//   greeting: { fontSize: 22, fontWeight: '600', color: '#333', marginBottom: 4 },
//   subGreeting: { fontSize: 13, color: '#555', marginBottom: 20 },
//   animation: { width: 250, height: 250, marginBottom: 30, alignSelf: 'center' },
//   quickActions: {
//     flexDirection: 'row',
//     marginBottom: 25,
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingHorizontal: 10,
//   },
//   actionButton: {
//     backgroundColor: '#FFB703',
//     borderRadius: 15,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     alignItems: 'center',
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   actionText: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginTop: 4, textAlign: 'center' },
//   button: {
//     backgroundColor: '#9C27B0',
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//     elevation: 4,
//     alignSelf: 'center',
//   },
//   buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   modalBox: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 25,
//     alignItems: 'center',
//     width: '85%',
//     elevation: 5,
//   },
//   modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#9C27B0', textAlign: 'center' },
//   modalText: { fontSize: 16, color: '#333', marginBottom: 20, textAlign: 'center' },
//   closeButton: {
//     backgroundColor: '#9C27B0',
//     paddingVertical: 10,
//     paddingHorizontal: 25,
//     borderRadius: 20,
//   },
//   closeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [surpriseModalVisible, setSurpriseModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [surpriseItem, setSurpriseItem] = useState('');
  const [userName, setUserName] = useState('');

  const tips = [
    'Tip: Adding a pinch of salt to coffee balances bitterness ☕',
    'Tip: Soak onions in cold water to reduce sharpness 🧅',
    'Tip: Freeze herbs in olive oil for easy cooking later 🌿',
    'Tip: Let meat rest before slicing to keep juices inside 🍖',
  ];

  const surpriseRecipes = [
    'Pasta Primavera 🍝',
    'Spicy Tofu Stir-fry 🌶️',
    'Berry Smoothie 🫐',
    'Garlic Butter Shrimp 🍤',
    'Avocado Toast 🥑',
  ];

  useFocusEffect(
    useCallback(() => {
      const loadUserNameAndShowTip = async () => {
        try {
          const storedName = await AsyncStorage.getItem('userName');
          setUserName(storedName?.trim() || 'Chef');

          // Show random tip as toast immediately
          const randomTip = tips[Math.floor(Math.random() * tips.length)];
          Toast.show(randomTip, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            backgroundColor: '#333',
            textColor: '#fff',
            shadow: true,
            animation: true,
          });
        } catch (error) {
          console.error('Error loading username:', error);
          setUserName('Chef');
        }
      };

      loadUserNameAndShowTip();
    }, [])
  );

  const handleSurprise = () => {
    const pick = surpriseRecipes[Math.floor(Math.random() * surpriseRecipes.length)];
    setSurpriseItem(pick);
    setSurpriseModalVisible(true);
  };

  return (
    <ImageBackground
      source={require('../assets/homebg2.jpeg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LottieView
        source={require('../assets/Food Choice.json')}
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />

      <View style={styles.overlay}>
        <View style={styles.topBar}>
          <Text style={styles.appName}>YumMate!</Text>
          <TouchableOpacity
            style={styles.profileIcon}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image
              source={require('../assets/logo.jpg')}
              style={{ width: 40, height: 40, borderRadius: 18 }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.greeting}>Hi, {userName} 👋</Text>
        <Text style={styles.subGreeting}>Ready to cook something amazing?</Text>

        <LottieView
          source={require('../assets/Food Choice.json')}
          autoPlay
          loop
          style={styles.animation}
        />

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSurprise}>
            <MaterialCommunityIcons name="star-circle" size={28} color="#fff" />
            <Text style={styles.actionText}>Surprise Me</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Chatbot')}
          >
            <MaterialCommunityIcons name="basket" size={28} color="#fff" />
            <Text style={styles.actionText}>Use Ingredients</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('BrowseRecipes')}
          >
            <Feather name="book-open" size={28} color="#fff" />
            <Text style={styles.actionText}>Browse</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setInfoModalVisible(true)}>
          <Text style={styles.buttonText}>What’s YumMate? 🤔</Text>
        </TouchableOpacity>

        <Modal transparent animationType="fade" visible={surpriseModalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>🎯 Surprise Recipe!</Text>
              <Text style={styles.modalText}>{surpriseItem}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSurpriseModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Done!!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal transparent animationType="fade" visible={infoModalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>ℹ️ About YumMate</Text>
              <Text style={styles.modalText}>
                YumMate helps you discover delicious recipes, cooking tips, and the best ways to use
                the ingredients you already have. Whether you’re feeling adventurous or just hungry,
                we’ve got you covered!
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setInfoModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Got it!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  backgroundAnimation: { position: 'absolute', width: '100%', height: '100%', opacity: 0.1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.65)',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: { fontSize: 24, fontWeight: 'bold', color: '#9C27B0' },
  profileIcon: { padding: 5 },
  greeting: { fontSize: 22, fontWeight: '600', color: '#333', marginBottom: 4 },
  subGreeting: { fontSize: 13, color: '#555', marginBottom: 20 },
  animation: { width: 250, height: 250, marginBottom: 30, alignSelf: 'center' },
  quickActions: {
    flexDirection: 'row',
    marginBottom: 25,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  actionButton: {
    backgroundColor: '#FFB703',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  actionText: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginTop: 4, textAlign: 'center' },
  button: {
    backgroundColor: '#9C27B0',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 4,
    alignSelf: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '85%',
    elevation: 5,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#9C27B0', textAlign: 'center' },
  modalText: { fontSize: 16, color: '#333', marginBottom: 20, textAlign: 'center' },
  closeButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  closeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
