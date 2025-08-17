// screens/RecipeSearchScreen.js
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
  Modal,
  ScrollView
} from 'react-native';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { LikedRecipesContext } from '../LikedRecipesContext'; // ✅ fix path

const BACKEND_URL = 'http://192.168.1.36:3000'; // change if needed

export default function RecipeSearchScreen() {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState('5');
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const { likedRecipes, toggleLike } = useContext(LikedRecipesContext);

  const tipsList = [
    "Try adding fresh herbs for extra flavor!",
    "Don't forget to season generously.",
    "A squeeze of lemon can brighten your dish.",
    "Balance flavors with a touch of sweetness.",
    "Texture is key — mix crunchy and creamy."
  ];
  const [tipIndex, setTipIndex] = useState(0);
  const tipFadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(tipFadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(tipFadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start(() => {
        setTipIndex((prev) => (prev + 1) % tipsList.length);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchRecipes = async () => {
    if (!query.trim()) {
      Alert.alert('Please enter ingredients');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/get-food-items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: query, limit: parseInt(limit) })
      });
      const data = await res.json();
      if (data.foodItems) {
        setFoodItems(data.foodItems);
      } else {
        setFoodItems([]);
        Alert.alert('No recipes found');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch recipes from server.');
    } finally {
      setLoading(false);
    }
  };

  const openRecipe = async (recipeName) => {
    setSelectedRecipe(recipeName);
    setRecipeDetails('Loading recipe...');
    setModalVisible(true);

    try {
      const res = await fetch(`${BACKEND_URL}/get-recipe-details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeName })
      });
      const data = await res.json();
      setRecipeDetails(data.instructions || 'No instructions found.');
    } catch (err) {
      setRecipeDetails('Error fetching recipe details.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'transparent' }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={styles.topText}>Mix, match, and make something delicious!</Text>

        {/* Search Inputs */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter ingredients"
            value={query}
            onChangeText={setQuery}
          />
          <TextInput
            style={styles.inputCount}
            placeholder="Count"
            keyboardType="numeric"
            value={limit}
            onChangeText={setLimit}
          />
        </View>

        {/* Search Button */}
        <TouchableOpacity style={styles.goButton} onPress={fetchRecipes} disabled={loading}>
          <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
            {loading ? 'Loading...' : 'Go'}
          </Text>
        </TouchableOpacity>

        {/* Recipe List */}
        <FlatList
          data={foodItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => openRecipe(item)}>
              <LinearGradient colors={['#f3e5f5', '#e1bee7']} style={styles.cardGradient}>
                <Text style={styles.cardText}>{item}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 160 }}
          ListEmptyComponent={
            !loading && <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>
              No recipes yet. Try searching!
            </Text>
          }
        />
      </View>

      {/* Modal for Recipe Details */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginBottom: 20 }}>
            <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#6200EE'
          }}>
            Close
          </Text>
          </TouchableOpacity>

          <ScrollView>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
              {selectedRecipe}
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 22 }}>
              {recipeDetails}
            </Text>
          </ScrollView>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    textAlign: 'center',
    color: '#444',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  inputCount: {
    width: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
  },
  goButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 16,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  }
});
