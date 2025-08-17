
// // ------------------------------------



// import React, { useState, useCallback, useEffect } from 'react';
// import { 
//   View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Pressable, TextInput, RefreshControl, ScrollView 
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { AntDesign, Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// // Recipes with ingredients + steps
// const recipesData = [
//   { id: '1', title: 'Spaghetti Aglio e Olio', ingredients: ['Spaghetti','Garlic','Olive Oil','Chili Flakes','Parsley','Salt'], steps:['Boil pasta','Sauté garlic in oil','Add chili flakes','Mix pasta and sauce','Garnish with parsley'], image: require('../assets/pic1.jpeg'), rating: 4.5, category: 'Dinner' },
//   { id: '2', title: 'Avocado Toast', ingredients: ['Bread','Avocado','Lemon Juice','Salt','Pepper'], steps:['Toast bread','Mash avocado with lemon','Spread on toast','Season with salt & pepper'], image: require('../assets/pic2.jpeg'), rating: 4.0, category: 'Breakfast' },
//   { id: '3', title: 'Veggie Stir-Fry', ingredients: ['Broccoli','Carrot','Bell Pepper','Soy Sauce','Garlic'], steps:['Chop vegetables','Heat oil','Stir-fry veggies','Add soy sauce','Serve hot'], image: require('../assets/pic3.jpeg'), rating: 4.2, category: 'Lunch' },
//   { id: '4', title: 'Pancakes', ingredients: ['Flour','Eggs','Milk','Sugar','Butter','Maple Syrup'], steps:['Mix dry ingredients','Add milk and eggs','Stir to smooth batter','Cook on skillet','Serve with syrup'], image: require('../assets/pic4.jpeg'), rating: 4.8, category: 'Breakfast' },
//   { id: '5', title: 'Caesar Salad', ingredients: ['Romaine','Caesar Dressing','Croutons','Parmesan Cheese'], steps:['Chop romaine','Add dressing','Toss salad','Top with croutons and parmesan'], image: require('../assets/pic5.jpeg'), rating: 4.3, category: 'Lunch' },
//   { id: '6', title: 'Fruit Bowl', ingredients: ['Mango','Strawberry','Kiwi','Grapes','Watermelon'], steps:['Chop all fruits','Mix in a bowl','Serve chilled'], image: require('../assets/pic6.jpeg'), rating: 4.6, category: 'Dessert' },
//   { id: '7', title: 'Grilled Cheese Sandwich', ingredients: ['Bread','Cheddar Cheese','Butter'], steps:['Butter bread','Add cheese','Grill until golden brown'], image: require('../assets/pic7.jpeg'), rating: 4.4, category: 'Lunch' },
//   { id: '8', title: 'Tomato Soup', ingredients: ['Tomatoes','Onion','Garlic','Cream','Salt','Pepper'], steps:['Sauté onion and garlic','Add tomatoes','Cook and blend','Add cream','Season to taste'], image: require('../assets/pic8.jpeg'), rating: 4.5, category: 'Dinner' },
// ];

// const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];
// const emptyIllustration = require('../assets/none2.png');

// export default function BrowseRecipes() {
//   const navigation = useNavigation();

//   const [recipes, setRecipes] = useState([]);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const storedLikes = await AsyncStorage.getItem('likedRecipes');
//         let likedIds = [];
//         if (storedLikes) {
//           likedIds = JSON.parse(storedLikes).map(r => r.id);
//         }
//         const updatedRecipes = recipesData.map(r => ({ ...r, liked: likedIds.includes(r.id) }));
//         setRecipes(updatedRecipes);
//       } catch (err) {
//         console.log(err);
//         setRecipes(recipesData);
//       }
//     };
//     loadData();
//   }, []);

//   const filteredRecipes = recipes.filter(r => {
//     const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       const shuffled = [...recipesData].sort(() => Math.random() - 0.5);
//       setRecipes(shuffled);
//       setRefreshing(false);
//     }, 1000);
//   }, []);

//   const toggleLike = async (recipeId) => {
//     try {
//       const updatedRecipes = recipes.map(r => r.id === recipeId ? { ...r, liked: !r.liked } : r);
//       setRecipes(updatedRecipes);
//       const likedRecipes = updatedRecipes.filter(r => r.liked).map(r => ({ id: r.id, title: r.title, ingredients: r.ingredients }));
//       await AsyncStorage.setItem('likedRecipes', JSON.stringify(likedRecipes));
//     } catch (err) {
//       console.log('Error saving liked recipes', err);
//     }
//   };

//   const renderItem = ({ item }) => {
//     const fullStars = Math.floor(item.rating);
//     const halfStar = item.rating % 1 >= 0.5 ? '½' : '';
//     const stars = '⭐'.repeat(fullStars) + halfStar;

//     return (
//       <TouchableOpacity style={styles.card} onPress={() => setSelectedRecipe(item)}>
//         <Image source={item.image} style={styles.image} />
//         <View style={styles.info}>
//           <View style={styles.titleRow}>
//             <Text style={styles.title}>{item.title}</Text>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <Text style={styles.stars}>{stars}</Text>
//               <TouchableOpacity onPress={() => toggleLike(item.id)} style={{ marginLeft: 10 }}>
//                 <AntDesign name={item.liked ? "heart" : "hearto"} size={26} color="#FF4D6D" />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <Text style={styles.preview}>{item.ingredients.slice(0,3).join(', ')}...</Text>
//           <Pressable style={styles.detailsButton} onPress={() => setSelectedRecipe(item)}>
//             <Text style={styles.detailsText}>View Details</Text>
//           </Pressable>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <LinearGradient colors={['#ffffff', '#9C27B0']} style={styles.gradient}>
//       <View style={styles.container}>

//         {/* Back Button */}
//         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={28} color="#9C27B0" />
//           <Text style={styles.backText}>Back</Text>
//         </TouchableOpacity>

//         <Text style={styles.smallText}>🍽 Browse and discover recipes</Text>

//         {/* Search */}
//         <View style={styles.searchWrapper}>
//           <AntDesign name="search1" size={20} color="#888" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search recipes..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//         </View>

//         {/* Categories */}
//         <View style={styles.categories}>
//           {categories.map(cat => (
//             <TouchableOpacity 
//               key={cat} 
//               style={[styles.categoryChip, activeCategory === cat && styles.activeChip]}
//               onPress={() => setActiveCategory(cat)}
//             >
//               <Text style={activeCategory === cat ? styles.activeCatText : styles.catText}>{cat}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Recipe List */}
//         {filteredRecipes.length === 0 ? (
//           <View style={styles.emptyState}>
//             <Image source={emptyIllustration} style={styles.emptyImage} resizeMode="contain" />
//             <Text style={styles.emptyText}>No recipes found 😢</Text>
//           </View>
//         ) : (
//           <FlatList
//             data={filteredRecipes}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id}
//             contentContainerStyle={{ paddingBottom: 20 }}
//             refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//           />
//         )}

//         {/* Recipe Modal */}
//         <Modal visible={!!selectedRecipe} animationType="slide" transparent onRequestClose={() => setSelectedRecipe(null)}>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalBox}>
//               <ScrollView contentContainerStyle={{paddingVertical:20}} showsVerticalScrollIndicator={false}>
//                 <Text style={styles.modalTitle}>{selectedRecipe?.title}</Text>
//                 <Text style={styles.modalSection}>🛒 Ingredients:</Text>
//                 {selectedRecipe?.ingredients.map((ing, idx) => (
//                   <Text key={idx} style={styles.modalText}>• {ing}</Text>
//                 ))}
//                 <Text style={styles.modalSection}>👩‍🍳 Steps:</Text>
//                 {selectedRecipe?.steps.map((step, idx) => (
//                   <Text key={idx} style={styles.modalText}>{idx+1}. {step}</Text>
//                 ))}
//                 <Pressable style={styles.closeButton} onPress={() => setSelectedRecipe(null)}>
//                   <Text style={styles.closeButtonText}>Close</Text>
//                 </Pressable>
//               </ScrollView>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   gradient: { flex: 1 },
//   container: { flex: 1, paddingTop: 25, paddingHorizontal: 20 },
//   backBtn: { flexDirection:'row', alignItems:'center', marginBottom:10 },
//   backText: { fontSize:18, color:'#9C27B0', marginLeft:6 },
//   smallText: { fontSize: 21, color: '#9C27B0', textAlign: 'center', marginBottom: 12, fontWeight:'500', marginTop:10 },
  
//   searchWrapper: { flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderRadius:25, elevation:3, shadowColor:'#000', shadowOpacity:0.1, shadowRadius:5, marginBottom:12 },
//   searchIcon: { paddingHorizontal:15 },
//   searchInput: { flex:1, paddingVertical:10, fontSize:16, paddingLeft:0, color:'#000', height:50 },

//   categories: { flexDirection:'row', justifyContent:'space-around', marginBottom:18 },
//   categoryChip: { paddingHorizontal:14, paddingVertical:8, backgroundColor:'#eee', borderRadius:20 },
//   activeChip: { backgroundColor:'#9C27B0', shadowColor:'#000', shadowOpacity:0.2, shadowRadius:5 },
//   catText: { color:'#333', fontWeight:'500' },
//   activeCatText: { color:'#fff', fontWeight:'bold' },

//   card: { backgroundColor: '#fff', borderRadius:15, marginBottom:18, overflow: 'hidden', elevation:5, shadowColor:'#000', shadowOpacity:0.1, shadowRadius:8 },
//   image: { width: '100%', height: 190 },
//   info: { padding:12 },
//   titleRow: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:6 },
//   title: { fontSize:19, fontWeight:'bold', color:'#333' },
//   stars: { fontSize:16, color:'#FFD700', marginRight:5 },
//   preview: { fontSize:14, color:'#555', marginBottom:8 },
//   detailsButton: { backgroundColor:'#9C27B0', paddingVertical:8, paddingHorizontal:18, borderRadius:20, alignSelf:'flex-start', elevation:3 },
//   detailsText: { color:'#fff', fontWeight:'bold', fontSize:15 },

//   modalOverlay: { flex:1, backgroundColor:'rgba(0,0,0,0.4)', justifyContent:'center', alignItems:'center' },
//   modalBox: { backgroundColor:'#fff', padding:20, borderRadius:20, width:'85%', alignSelf:'center', maxHeight:'80%', elevation:5, shadowColor:'#000', shadowOpacity:0.15, shadowRadius:10 },
//   modalTitle: { fontSize:22, fontWeight:'bold', marginBottom:15, color:'#9C27B0', textAlign:'center' },
//   modalSection: { fontSize:18, fontWeight:'bold', marginTop:10, marginBottom:5, color:'#333' },
//   modalText: { fontSize:16, color:'#555', marginBottom:4 },
//   closeButton: { backgroundColor:'#9C27B0', paddingHorizontal:22, paddingVertical:12, borderRadius:22, marginTop:20, alignSelf:'center' },
//   closeButtonText: { color:'#fff', fontSize:16, fontWeight:'bold' },

//   emptyState: { flex:1, justifyContent:'center', alignItems:'center', marginTop:-100 },
//   emptyImage: { width:320, height:320, marginBottom:12, shadowColor:'#000', shadowOpacity:0.15, shadowRadius:10, marginLeft:'11%' },
//   emptyText: { fontSize: 20, color: '#fffdfdff', marginTop: -20 },
// });


// -----------------------------------


import React, { useState, useEffect, useContext, useCallback } from 'react';
import { 
  View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Pressable, TextInput, RefreshControl, ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LikedRecipesContext } from '../LikedRecipesContext';

// Recipes data
const recipesData = [
  { id: '1', title: 'Spaghetti Aglio e Olio', ingredients: ['Spaghetti','Garlic','Olive Oil','Chili Flakes','Parsley','Salt'], steps:['Boil pasta','Sauté garlic in oil','Add chili flakes','Mix pasta and sauce','Garnish with parsley'], image: require('../assets/pic1.jpeg'), rating: 4.5, category: 'Dinner' },
  { id: '2', title: 'Avocado Toast', ingredients: ['Bread','Avocado','Lemon Juice','Salt','Pepper'], steps:['Toast bread','Mash avocado with lemon','Spread on toast','Season with salt & pepper'], image: require('../assets/pic2.jpeg'), rating: 4.0, category: 'Breakfast' },
  { id: '3', title: 'Veggie Stir-Fry', ingredients: ['Broccoli','Carrot','Bell Pepper','Soy Sauce','Garlic'], steps:['Chop vegetables','Heat oil','Stir-fry veggies','Add soy sauce','Serve hot'], image: require('../assets/pic3.jpeg'), rating: 4.2, category: 'Lunch' },
  { id: '4', title: 'Pancakes', ingredients: ['Flour','Eggs','Milk','Sugar','Butter','Maple Syrup'], steps:['Mix dry ingredients','Add milk and eggs','Stir to smooth batter','Cook on skillet','Serve with syrup'], image: require('../assets/pic4.jpeg'), rating: 4.8, category: 'Breakfast' },
  { id: '5', title: 'Caesar Salad', ingredients: ['Romaine','Caesar Dressing','Croutons','Parmesan Cheese'], steps:['Chop romaine','Add dressing','Toss salad','Top with croutons and parmesan'], image: require('../assets/pic5.jpeg'), rating: 4.3, category: 'Lunch' },
  { id: '6', title: 'Fruit Bowl', ingredients: ['Mango','Strawberry','Kiwi','Grapes','Watermelon'], steps:['Chop all fruits','Mix in a bowl','Serve chilled'], image: require('../assets/pic6.jpeg'), rating: 4.6, category: 'Dessert' },
  { id: '7', title: 'Grilled Cheese Sandwich', ingredients: ['Bread','Cheddar Cheese','Butter'], steps:['Butter bread','Add cheese','Grill until golden brown'], image: require('../assets/pic7.jpeg'), rating: 4.4, category: 'Lunch' },
  { id: '8', title: 'Tomato Soup', ingredients: ['Tomatoes','Onion','Garlic','Cream','Salt','Pepper'], steps:['Sauté onion and garlic','Add tomatoes','Cook and blend','Add cream','Season to taste'], image: require('../assets/pic8.jpeg'), rating: 4.5, category: 'Dinner' },
];

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];
const emptyIllustration = require('../assets/none2.png');

export default function BrowseRecipes() {
  const navigation = useNavigation();
  const { likedRecipes, toggleLike } = useContext(LikedRecipesContext);

  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  // Sync recipes with likedRecipes from context
  useEffect(() => {
    const likedIds = likedRecipes.map(r => r.id);
    const updatedRecipes = recipesData.map(r => ({ ...r, liked: likedIds.includes(r.id) }));
    setRecipes(updatedRecipes);
  }, [likedRecipes]);

  const filteredRecipes = recipes.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const shuffled = [...recipesData].sort(() => Math.random() - 0.5);
      setRecipes(shuffled);
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleLike = (recipe) => {
    toggleLike({ id: recipe.id, title: recipe.title, ingredients: recipe.ingredients });
  };

  const renderItem = ({ item }) => {
    const fullStars = Math.floor(item.rating);
    const halfStar = item.rating % 1 >= 0.5 ? '½' : '';
    const stars = '⭐'.repeat(fullStars) + halfStar;

    return (
      <TouchableOpacity style={styles.card} onPress={() => setSelectedRecipe(item)}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.stars}>{stars}</Text>
              <TouchableOpacity onPress={() => handleLike(item)} style={{ marginLeft: 10 }}>
                <AntDesign name={item.liked ? "heart" : "hearto"} size={26} color="#FF4D6D" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.preview}>{item.ingredients.slice(0,3).join(', ')}...</Text>
          <Pressable style={styles.detailsButton} onPress={() => setSelectedRecipe(item)}>
            <Text style={styles.detailsText}>View Details</Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#ffffff', '#9C27B0']} style={styles.gradient}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#9C27B0" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.smallText}>🍽 Browse and discover recipes</Text>

        <View style={styles.searchWrapper}>
          <AntDesign name="search1" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.categories}>
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.categoryChip, activeCategory === cat && styles.activeChip]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={activeCategory === cat ? styles.activeCatText : styles.catText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredRecipes.length === 0 ? (
          <View style={styles.emptyState}>
            <Image source={emptyIllustration} style={styles.emptyImage} resizeMode="contain" />
            <Text style={styles.emptyText}>No recipes found 😢</Text>
          </View>
        ) : (
          <FlatList
            data={filteredRecipes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        )}

        <Modal visible={!!selectedRecipe} animationType="slide" transparent onRequestClose={() => setSelectedRecipe(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <ScrollView contentContainerStyle={{paddingVertical:20}} showsVerticalScrollIndicator={false}>
                <Text style={styles.modalTitle}>{selectedRecipe?.title}</Text>
                <Text style={styles.modalSection}>🛒 Ingredients:</Text>
                {selectedRecipe?.ingredients.map((ing, idx) => (
                  <Text key={idx} style={styles.modalText}>• {ing}</Text>
                ))}
                <Text style={styles.modalSection}>👩‍🍳 Steps:</Text>
                {selectedRecipe?.steps.map((step, idx) => (
                  <Text key={idx} style={styles.modalText}>{idx+1}. {step}</Text>
                ))}
                <Pressable style={styles.closeButton} onPress={() => setSelectedRecipe(null)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, paddingTop: 25, paddingHorizontal: 20 },
  backBtn: { flexDirection:'row', alignItems:'center', marginBottom:10 },
  backText: { fontSize:18, color:'#9C27B0', marginLeft:6 },
  smallText: { fontSize: 21, color: '#9C27B0', textAlign: 'center', marginBottom: 12, fontWeight:'500', marginTop:10 },
  
  searchWrapper: { flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderRadius:25, elevation:3, shadowColor:'#000', shadowOpacity:0.1, shadowRadius:5, marginBottom:12 },
  searchIcon: { paddingHorizontal:15 },
  searchInput: { flex:1, paddingVertical:10, fontSize:16, paddingLeft:0, color:'#000', height:50 },

  categories: { flexDirection:'row', justifyContent:'space-around', marginBottom:18 },
  categoryChip: { paddingHorizontal:14, paddingVertical:8, backgroundColor:'#eee', borderRadius:20 },
  activeChip: { backgroundColor:'#9C27B0', shadowColor:'#000', shadowOpacity:0.2, shadowRadius:5 },
  catText: { color:'#333', fontWeight:'500' },
  activeCatText: { color:'#fff', fontWeight:'bold' },

  card: { backgroundColor: '#fff', borderRadius:15, marginBottom:18, overflow: 'hidden', elevation:5, shadowColor:'#000', shadowOpacity:0.1, shadowRadius:8 },
  image: { width: '100%', height: 190 },
  info: { padding:12 },
  titleRow: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:6 },
  title: { fontSize:19, fontWeight:'bold', color:'#333' },
  stars: { fontSize:16, color:'#FFD700', marginRight:5 },
  preview: { fontSize:14, color:'#555', marginBottom:8 },
  detailsButton: { backgroundColor:'#9C27B0', paddingVertical:8, paddingHorizontal:18, borderRadius:20, alignSelf:'flex-start', elevation:3 },
  detailsText: { color:'#fff', fontWeight:'bold', fontSize:15 },

  modalOverlay: { flex:1, backgroundColor:'rgba(0,0,0,0.4)', justifyContent:'center', alignItems:'center' },
  modalBox: { backgroundColor:'#fff', padding:20, borderRadius:20, width:'85%', alignSelf:'center', maxHeight:'80%', elevation:5, shadowColor:'#000', shadowOpacity:0.15, shadowRadius:10 },
  modalTitle: { fontSize:22, fontWeight:'bold', marginBottom:15, color:'#9C27B0', textAlign:'center' },
  modalSection: { fontSize:18, fontWeight:'bold', marginTop:10, marginBottom:5, color:'#333' },
  modalText: { fontSize:16, color:'#555', marginBottom:4 },
  closeButton: { backgroundColor:'#9C27B0', paddingHorizontal:22, paddingVertical:12, borderRadius:22, marginTop:20, alignSelf:'center' },
  closeButtonText: { color:'#fff', fontSize:16, fontWeight:'bold' },

  emptyState: { flex:1, justifyContent:'center', alignItems:'center', marginTop:-100 },
  emptyImage: { width:320, height:320, marginBottom:12, shadowColor:'#000', shadowOpacity:0.15, shadowRadius:10, marginLeft:'11%' },
  emptyText: { fontSize: 20, color: '#fffdfdff', marginTop: -20 },
});
