


// // // -----------------------------------


// import React, { useState } from 'react';
// import {
//   View, TextInput, FlatList, Text, TouchableOpacity, Image,
//   StyleSheet, ActivityIndicator, Alert
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// const BACKEND_URL = 'http://192.168.1.36:3000';

// export default function ChatbotScreen() {
//   const [ingredients, setIngredients] = useState('');
//   const [itemCount, setItemCount] = useState('5');
//   const [foodItems, setFoodItems] = useState([]);
//   const [selectedFood, setSelectedFood] = useState(null);
//   const [foodImage, setFoodImage] = useState(null);
//   const [recipe, setRecipe] = useState('');
//   const [loadingSuggestions, setLoadingSuggestions] = useState(false);
//   const [loadingImage, setLoadingImage] = useState(false);

//   const handleFetchSuggestions = async () => {
//     if (!ingredients.trim()) return Alert.alert('Please enter ingredients.');
//     setLoadingSuggestions(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/get-food-items`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ingredients, limit: parseInt(itemCount) }),
//       });
//       const data = await res.json();
//       setFoodItems(data.foodItems || []);
//     } catch (err) {
//       Alert.alert('Error', 'Failed to fetch suggestions.');
//     } finally {
//       setLoadingSuggestions(false);
//     }
//   };

//   const handleGetImageAndRecipe = async (foodName) => {
//     setSelectedFood(foodName);
//     setFoodImage(null);
//     setRecipe('');
//     setLoadingImage(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/get-food-image`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ foodName }),
//       });
//       const data = await res.json();
//       setFoodImage(data.imageUrl);
//       setRecipe(data.recipe);
//     } catch (err) {
//       Alert.alert('Error', 'Failed to fetch image.');
//     } finally {
//       setLoadingImage(false);
//     }
//   };

//   return (
//     <LinearGradient colors={['#FFF7F0', '#FFE6D1']} style={styles.container}>
//       <FlatList
//         data={foodItems}
//         keyExtractor={(item) => item}
//         ListHeaderComponent={
//           <>
//             <Text style={styles.heading}>🍽️ Cooking Buddy!</Text>
//             <Text style={styles.subheading}>
//               Enter what’s in your fridge & choose how many ideas you want.
//             </Text>

//             {/* Input fields */}
//             <TextInput
//               placeholder="e.g. chicken, rice, tomato"
//               style={styles.input}
//               value={ingredients}
//               onChangeText={setIngredients}
//             />
//             <TextInput
//               placeholder="Number of suggestions (e.g. 5)"
//               style={styles.input}
//               value={itemCount}
//               onChangeText={setItemCount}
//               keyboardType="numeric"
//             />

//             {/* Button */}
//             <TouchableOpacity
//               onPress={handleFetchSuggestions}
//               disabled={loadingSuggestions}
//               style={{ borderRadius: 12, overflow: 'hidden', marginTop: 5 }}
//             >
//               <LinearGradient
//                 colors={['#FF8A00', '#FF5500']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.button}
//               >
//                 <Text style={styles.buttonText}>
//                   {loadingSuggestions ? 'Loading...' : 'Get Food Suggestions'}
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>

//             {loadingSuggestions && <ActivityIndicator style={{ marginTop: 10 }} color="#FF6F00" />}
//           </>
//         }
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => handleGetImageAndRecipe(item)}
//           >
//             <Text style={styles.cardText}>{item}</Text>
//           </TouchableOpacity>
//         )}
//         ListFooterComponent={
//           <>
//             {loadingImage && <ActivityIndicator size="large" style={{ marginTop: 20 }} color="#FF6F00" />}
//             {foodImage && !loadingImage && (
//               <View style={styles.result}>
//                 <Image source={{ uri: foodImage }} style={styles.image} />
//                 <Text style={styles.recipeTitle}>Recipe for {selectedFood}</Text>
//                 <Text style={styles.recipeText}>{recipe}</Text>
//               </View>
//             )}
//             <View style={{ height: 30 }} />
//           </>
//         }
//       />
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#FF6F00',
//     textAlign: 'center',
//     marginBottom: 6,
//   },
//   subheading: {
//     fontSize: 15,
//     color: '#777',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     padding: 12,
//     borderRadius: 12,
//     borderColor: '#FFD8B5',
//     marginBottom: 12,
//     backgroundColor: '#FFF',
//     elevation: 2,
//   },
//   button: {
//     paddingVertical: 14,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   card: {
//     padding: 14,
//     backgroundColor: '#FFF',
//     marginVertical: 6,
//     borderRadius: 14,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   result: {
//     marginTop: 20,
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.85)',
//     borderRadius: 16,
//     padding: 18,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   image: {
//     width: 260,
//     height: 200,
//     borderRadius: 14,
//   },
//   recipeTitle: {
//     marginTop: 14,
//     fontSize: 19,
//     fontWeight: 'bold',
//     color: '#FF6F00',
//   },
//   recipeText: {
//     marginTop: 10,
//     fontSize: 14,
//     textAlign: 'center',
//     color: '#555',
//     lineHeight: 20,
//   },
// });
// 1)working

// // // ------------------------


// ------------------------------------



// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
//   StyleSheet,
//   FlatList,
//   Animated,
//   Easing,
//   ScrollView,
//   Image,
// } from 'react-native';
// import Collapsible from 'react-native-collapsible';
// import { LinearGradient } from 'expo-linear-gradient';

// const tipsList = [
//   "Tip: Tomatoes pair well with basil!",
//   "Tip: Olive oil enhances flavor!",
//   "Tip: Fresh herbs elevate any dish!",
//   "Tip: Season gradually for best taste!",
//   "Tip: Let meat rest after cooking!",
// ];

// export default function RecipeFinder() {
//   const [ingredients, setIngredients] = useState('');
//   const [itemCount, setItemCount] = useState('5');
//   const [foodItems, setFoodItems] = useState([]);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(false);
//   const [dotIndex, setDotIndex] = useState(0);
//   const [tipIndex, setTipIndex] = useState(0);

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(1)).current;
//   const tipFadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     let interval;
//     if (loadingSuggestions) {
//       interval = setInterval(() => {
//         setDotIndex(prev => (prev + 1) % 4);
//       }, 500);
//     }
//     return () => clearInterval(interval);
//   }, [loadingSuggestions]);

//   useEffect(() => {
//     // Rotating tips
//     const tipInterval = setInterval(() => {
//       setTipIndex(prev => (prev + 1) % tipsList.length);
//       tipFadeAnim.setValue(0);
//       Animated.timing(tipFadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }).start();
//     }, 4000);
//     return () => clearInterval(tipInterval);
//   }, []);

//   const startAnimation = () => {
//     fadeAnim.setValue(0);
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 500,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const handleFetchSuggestions = () => {
//     Animated.sequence([
//       Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
//       Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
//     ]).start();

//     setLoadingSuggestions(true);
//     setTimeout(() => {
//       setFoodItems([
//         'Spaghetti Carbonara',
//         'Grilled Chicken Salad',
//         'Vegetable Stir Fry',
//         'Mushroom Risotto',
//         'Tomato Basil Soup',
//       ]);
//       startAnimation();
//       setLoadingSuggestions(false);
//     }, 2000);
//   };

//   const handleGetRecipe = (foodName) => {
//     setSelectedRecipe({
//       name: foodName,
//       image: 'https://via.placeholder.com/400x220.png?text=Recipe+Image',
//       ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
//       instructions: 'Step 1: Do this.\nStep 2: Do that.\nStep 3: Serve and enjoy!',
//     });
//   };

//   const RecipeCard = ({ item }) => {
//     const cardScale = useRef(new Animated.Value(1)).current;

//     const onPressIn = () => {
//       Animated.spring(cardScale, { toValue: 0.97, useNativeDriver: true }).start();
//     };
//     const onPressOut = () => {
//       Animated.spring(cardScale, { toValue: 1, useNativeDriver: true }).start();
//     };

//     return (
//       <Animated.View
//         style={{
//           transform: [{ scale: cardScale }],
//           opacity: fadeAnim,
//           marginVertical: 8,
//         }}
//       >
//         <TouchableOpacity
//           style={styles.card}
//           onPress={() => handleGetRecipe(item)}
//           onPressIn={onPressIn}
//           onPressOut={onPressOut}
//           activeOpacity={0.8}
//         >
//           <LinearGradient
//             colors={['#F3E5F5', '#E1BEE7']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.cardGradient}
//           >
//             <Text style={styles.cardText}>{item}</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </Animated.View>
//     );
//   };

//   if (selectedRecipe) {
//     return (
//       <ImageBackground
//         source={require('../assets/homebg2.jpeg')}
//         style={{ flex: 1 }}
//         resizeMode="cover"
//       >
//         <View style={styles.backgroundOverlay} />
//         <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>
//           <ImageBackground
//             source={{ uri: selectedRecipe.image }}
//             style={styles.detailImage}
//             imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
//           >
//             <LinearGradient
//               colors={['transparent', 'rgba(255,255,255,0.9)']}
//               style={styles.imageOverlay}
//             />
//           </ImageBackground>
//           <View style={styles.detailContainer}>
//             <Text style={styles.detailTitle}>{selectedRecipe.name}</Text>
//             <View style={styles.chipContainer}>
//               {selectedRecipe.ingredients.map((ing, idx) => (
//                 <LinearGradient
//                   key={idx}
//                   colors={['#9C27B0', '#7B1FA2']}
//                   style={styles.chip}
//                 >
//                   <Text style={styles.chipText}>{ing}</Text>
//                 </LinearGradient>
//               ))}
//             </View>
//             <Collapsible collapsed={false}>
//               <Text style={styles.instructions}>{selectedRecipe.instructions}</Text>
//             </Collapsible>
//             <TouchableOpacity style={styles.backButton} onPress={() => setSelectedRecipe(null)}>
//               <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Back</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </ImageBackground>
//     );
//   }

//   return (
//     <ImageBackground
//       source={require('../assets/homebg2.jpeg')}
//       style={{ flex: 1 }}
//     >
//       <View style={styles.backgroundOverlay} />

//       <View style={styles.container}>
//         <Text style={styles.topText}>Mix, match, and make something delicious!</Text>

//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter ingredients..."
//             value={ingredients}
//             onChangeText={setIngredients}
//           />
//           <TextInput
//             style={styles.inputCount}
//             placeholder="No. of items (max 5)"
//             value={itemCount}
//             onChangeText={setItemCount}
//             keyboardType="number-pad"
//             maxLength={1}
//           />
//         </View>

//         <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
//           <TouchableOpacity onPress={handleFetchSuggestions} style={styles.goButton}>
//             <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Go</Text>
//           </TouchableOpacity>
//         </Animated.View>

//         {loadingSuggestions && (
//           <View style={styles.footer}>
//             <Text style={styles.loadingText}>
//               Thinking of the tastiest options{'.'.repeat(dotIndex)}
//             </Text>
//           </View>
//         )}

//         <FlatList
//           data={foodItems}
//           keyExtractor={(item) => item}
//           renderItem={({ item }) => <RecipeCard item={item} />}
//           contentContainerStyle={{ paddingVertical: 10, paddingBottom: 220 }}
//         />

//         {/* Chef + tips section */}
//         <View style={styles.chefContainer}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.1)', 'transparent']}
//             style={styles.steamGradient}
//           />
//           <Image
//             source={require('../assets/chef-talk.png')}
//             style={styles.chefImage}
//             resizeMode="contain"
//           />
//           <Animated.View style={[styles.tipBubble, { opacity: tipFadeAnim }]}>
//             <Text style={styles.tipText}>🍅 {tipsList[tipIndex]}</Text>
//           </Animated.View>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     padding: 16, 
//     paddingTop: 32, 
//     backgroundColor: 'transparent',
//   },
//   backgroundOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(38, 31, 31, 0.3)',
//   },
//   topText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#9C27B0',
//     marginBottom: 16,
//     textAlign: 'center',
//     textShadowColor: 'rgba(0,0,0,0.3)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 3,
//   },
//   inputContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
//   input: {
//     flex: 1,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderRadius: 16,
//     marginRight: 8,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },
//   inputCount: {
//     width: 90,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderRadius: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },
//   goButton: {
//     backgroundColor: '#9C27B0',
//     borderRadius: 24,
//     paddingVertical: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   card: { borderRadius: 20, overflow: 'hidden', elevation: 3 },
//   cardGradient: { padding: 16, alignItems: 'center' },
//   cardText: { fontSize: 16, color: '#4A148C', fontWeight: '600' },
//   detailImage: { width: '100%', height: 220 },
//   imageOverlay: { flex: 1, justifyContent: 'flex-end', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
//   detailContainer: {
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     marginTop: -20,
//     padding: 16,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },
//   detailTitle: { fontSize: 24, fontWeight: 'bold', color: '#9C27B0', marginBottom: 12 },
//   chipContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
//   chip: { borderRadius: 25, paddingVertical: 6, paddingHorizontal: 16, margin: 4 },
//   chipText: { fontSize: 14, color: '#FFF', fontWeight: '500' },
//   instructions: { fontSize: 15, color: '#333', lineHeight: 24, padding: 12, backgroundColor: '#FAFAFA', borderRadius: 12 },
//   backButton: { marginTop: 16, backgroundColor: '#9C27B0', padding: 12, borderRadius: 12, alignItems: 'center' },
//   footer: { alignItems: 'center', marginTop: 20, marginBottom: 10 },
//   loadingText: { fontSize: 16, color: '#FFF', fontWeight: '500', marginBottom: 8 },

//   chefContainer: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     alignItems: 'center-start',
//     justifyContent: 'flex-end',
//     height: 200,
//     // backgroundColor:'snow',
//   },
//   steamGradient: {
//     ...StyleSheet.absoluteFillObject,
//     bottom: 0,
//     height: 150,
//     borderRadius: 100,
//   },
//   chefImage: { width: 120, height: 160, marginBottom: 20 ,marginLeft:50,},
//   tipBubble: {
//     position: 'absolute',
//     bottom: 120,
//     backgroundColor: 'rgba(255,255,255,0.95)',
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//     borderRadius: 20,
//     maxWidth: '85%',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//     marginLeft:130,
//     marginBottom:20,
//     // backgroundColor:'gray',
//   },
//   tipText: { fontSize: 14, fontWeight: '600', color: '#4A148C' },
// });
// 2) final design







// -------------------------------

// final working

// import {
//   View, Text, TextInput, TouchableOpacity, Image, StyleSheet,
//   Animated, FlatList, KeyboardAvoidingView, Platform, Alert, Modal, ScrollView, ImageBackground
// } from 'react-native';
// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { LikedRecipesContext } from '../LikedRecipesContext';

// const BACKEND_URL = 'http://192.168.1.36:3000'; // your backend address

// export default function RecipeScreen() {
//   const [query, setQuery] = useState('');
//   const [limit, setLimit] = useState('5');
//   const [foodItems, setFoodItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [recipeDetails, setRecipeDetails] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);

//   const { likedRecipes, toggleLike } = useContext(LikedRecipesContext);

//   const tipsList = [
//     "Try adding fresh herbs for extra flavor!",
//     "Don't forget to season generously.",
//     "A squeeze of lemon can brighten your dish.",
//     "Balance flavors with a touch of sweetness.",
//     "Texture is key — mix crunchy and creamy."
//   ];
//   const [tipIndex, setTipIndex] = useState(0);
//   const tipFadeAnim = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       Animated.sequence([
//         Animated.timing(tipFadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
//         Animated.timing(tipFadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
//       ]).start(() => {
//         setTipIndex((prev) => (prev + 1) % tipsList.length);
//       });
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchRecipes = async () => {
//     if (!query.trim()) {
//       Alert.alert('Please enter ingredients');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/get-food-items`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ingredients: query, limit: parseInt(limit) })
//       });
//       const data = await res.json();
//       if (data.foodItems) {
//         setFoodItems(data.foodItems);
//       } else {
//         setFoodItems([]);
//         Alert.alert('No recipes found');
//       }
//     } catch (err) {
//       Alert.alert('Error', 'Failed to fetch recipes from server.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openRecipe = async (recipeName) => {
//     setSelectedRecipe(recipeName);
//     setRecipeDetails('');
//     setModalVisible(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/get-recipe-details`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ recipeName })
//       });
//       const data = await res.json();
//       setRecipeDetails(data.text || 'No instructions found.');
//     } catch (err) {
//       setRecipeDetails('Error fetching recipe details.');
//     }
//   };

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
//       <ImageBackground
//         source={require('../assets/homebg2.jpeg')} // 👈 put your image inside assets folder
//         style={{ flex: 1 }}
//         resizeMode="cover"
//       >
//         <View style={{ flex: 1, padding: 16, backgroundColor: 'rgba(255,255,255,0.85)' }}>
//           <Text style={styles.topText}>Mix, match, and make something delicious!</Text>

//           <View style={styles.inputContainer}>
//             <TextInput style={styles.input} placeholder="Enter ingredients" value={query} onChangeText={setQuery} />
//             <TextInput style={styles.inputCount} placeholder="Count" keyboardType="numeric" value={limit} onChangeText={setLimit} />
//           </View>

//           <TouchableOpacity style={styles.goButton} onPress={fetchRecipes} disabled={loading}>
//             <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{loading ? 'Loading...' : 'Go'}</Text>
//           </TouchableOpacity>

//           <FlatList
//             data={foodItems}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <TouchableOpacity style={styles.card} onPress={() => openRecipe(item)}>
//                 <LinearGradient colors={['#f3e5f5', '#e1bee7']} style={styles.cardGradient}>
//                   <Text style={styles.cardText}>{item}</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             )}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ paddingBottom: 160 }}
//             ListEmptyComponent={!loading && <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>No recipes yet. Try searching!</Text>}
//           />
//         </View>

//         {/* Modal for Recipe Details */}
//         <Modal visible={modalVisible} animationType="slide">
//           <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
//             <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginBottom: 20 }}>
//               <Text style={{ fontSize: 18, color: '#9C27B0' }}>← Back</Text>
//             </TouchableOpacity>
//             <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>{selectedRecipe}</Text>
//             <TouchableOpacity onPress={() => toggleLike(selectedRecipe)} style={{ marginBottom: 20 }}>
//               <Text style={{ fontSize: 30 }}>
//                 {likedRecipes.includes(selectedRecipe) ? '❤️' : '🤍'}
//               </Text>
//             </TouchableOpacity>
//             <ScrollView>
//               <Text style={{ fontSize: 16, lineHeight: 24 }}>{recipeDetails}</Text>
//             </ScrollView>
//           </View>
//         </Modal>

//         {tipsList.length > 0 && (
//           <View style={styles.fixedChefContainer}>
//             <Image source={require('../assets/chef-talk.png')} style={styles.chefImage} resizeMode="contain" />
//             <Animated.View style={[styles.tipBubble, { opacity: tipFadeAnim }]}>
//               <Text style={styles.tipText}>🥘 Tip : {tipsList[tipIndex]} </Text>
//             </Animated.View>
//           </View>
//         )}
//       </ImageBackground>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   topText: { fontSize: 22, fontWeight: 'bold', color: '#9C27B0', marginBottom: 16, textAlign: 'center',marginTop:6, },
//   inputContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
//   input: { flex: 1, backgroundColor: '#fff', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 16, marginRight: 8 ,borderWidth:0.2},
//   inputCount: { width: 90, backgroundColor: '#fff', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 16 ,borderWidth:0.2},
//   goButton: { backgroundColor: '#9C27B0', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginBottom: 20 },
//   card: { borderRadius: 20, overflow: 'hidden', marginBottom: 10,
//     marginBottom:17,
//     marginHorizontal:16,
//    },
//   cardGradient: { padding: 16, alignItems: 'center' },
//   cardText: { fontSize: 16, color: '#4A148C', fontWeight: '600' },
//   fixedChefContainer: { position: 'absolute', bottom: 0, left: 0, right: 0,  flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 16, paddingVertical: 10, 
//     // borderTopLeftRadius: 20,
//     //  borderTopRightRadius: 20, 
//     //   shadowOpacity: 0.1,
//       //  shadowRadius: 5, 
//       //  elevation: 3
//        },
//   chefImage: { width: 120, height: 130, marginBottom: 30, marginLeft: -15 },
//   tipBubble: { flex: 1, marginLeft: 10, backgroundColor: 'white', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3, elevation: 2, marginBottom: 120, marginLeft: -20 },
//   tipText: { fontSize: 14, fontWeight: '600', color: '#4A148C' }
// });


// -----------------------------------


import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const BACKEND_URL = "http://192.168.1.36:3000"; // your backend address

export default function RecipeScreen() {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState("5");
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const tipsList = [
    "Try adding fresh herbs for extra flavor!",
    "Don't forget to season generously.",
    "A squeeze of lemon can brighten your dish.",
    "Balance flavors with a touch of sweetness.",
    "Texture is key — mix crunchy and creamy.",
  ];
  const [tipIndex, setTipIndex] = useState(0);
  const tipFadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(tipFadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(tipFadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTipIndex((prev) => (prev + 1) % tipsList.length);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchRecipes = async () => {
    if (!query.trim()) {
      Alert.alert("Please enter ingredients");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/get-food-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: query, limit: parseInt(limit) }),
      });
      const data = await res.json();
      if (data.foodItems) {
        setFoodItems(data.foodItems);
      } else {
        setFoodItems([]);
        Alert.alert("No recipes found");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to fetch recipes from server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("../assets/homebg2.jpeg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View
          style={{
            flex: 1,
            padding: 16,
            backgroundColor: "rgba(255,255,255,0.65)",
          }}
        >
          <Text style={styles.topText}>
            Mix, match, and make something delicious!
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter ingredients"
              value={query}
              onChangeText={setQuery}
            />
            {/* <TextInput
              style={styles.inputCount}
              placeholder="Count"
              keyboardType="numeric"
              value={limit}
              onChangeText={setLimit}
            /> */}
          </View>

          <TouchableOpacity
            style={styles.goButton}
            onPress={fetchRecipes}
            disabled={loading}
          >
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>
              {loading ? "Loading..." : "Go"}
            </Text>
          </TouchableOpacity>

          <FlatList
            data={foodItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate("RecipeDetails", { recipeName: item })
                }
              >
                <LinearGradient
                  colors={["#f3e5f5", "#e1bee7"]}
                  style={styles.cardGradient}
                >
                  <Text style={styles.cardText}>{item}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 160 }}
            ListEmptyComponent={
              !loading && (
                <Text
                  style={{
                    textAlign: "center",
                    color: "#888",
                    marginTop: 20,
                  }}
                >
                  No recipes yet. Try searching!
                </Text>
              )
            }
          />
        </View>

        {/* Chef Tips Bubble */}
        {tipsList.length > 0 && (
          <View style={styles.fixedChefContainer}>
            <Image
              source={require("../assets/chef-talk.png")}
              style={styles.chefImage}
              resizeMode="contain"
            />
            <Animated.View
              style={[styles.tipBubble, { opacity: tipFadeAnim }]}
            >
              <Text style={styles.tipText}>
                🥘 Tip : {tipsList[tipIndex]}{" "}
              </Text>
            </Animated.View>
          </View>
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#9C27B0",
    marginBottom: 16,
    textAlign: "center",
    marginTop: 6,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 0.3,
    height:60,
  },
  inputCount: {
    width: 90,
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 0.2,
  },
  goButton: {
    backgroundColor: "#9C27B0",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 17,
    marginHorizontal: 16,
  },
  cardGradient: { padding: 16, alignItems: "center" },
  cardText: { fontSize: 16, color: "#4A148C", fontWeight: "600" },
  fixedChefContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chefImage: { width: 120, height: 130, marginBottom: 30, marginLeft: -15 },
  tipBubble: {
    flex: 1,
    marginLeft: -20,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 120,
  },
  tipText: { fontSize: 14, fontWeight: "600", color: "#4A148C" },
});
