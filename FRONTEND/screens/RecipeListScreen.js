import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLikedRecipes } from "./LikedRecipesContext";

const recipes = [
  {
    name: "Spaghetti Carbonara",
    details: "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
    instructions:
      "1. Boil pasta. 2. Cook pancetta. 3. Whisk eggs and cheese. 4. Combine with pasta off heat."
  },
  {
    name: "Pancakes",
    details: "Fluffy breakfast pancakes served with syrup.",
    instructions:
      "1. Mix flour, eggs, milk. 2. Heat pan and pour batter. 3. Flip until golden."
  },
];

export default function RecipeListScreen() {
  const { likedRecipes, toggleLike } = useLikedRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const isLiked = (recipe) =>
    likedRecipes.some((r) => r.name === recipe.name);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => setSelectedRecipe(item)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>{item.details}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!selectedRecipe} animationType="slide">
        {selectedRecipe && (
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.title}>{selectedRecipe.name}</Text>
            <Text style={styles.instructions}>{selectedRecipe.instructions}</Text>
            <TouchableOpacity
              style={styles.heartButton}
              onPress={() => toggleLike(selectedRecipe)}
            >
              <Ionicons
                name={isLiked(selectedRecipe) ? "heart" : "heart-outline"}
                size={32}
                color="red"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedRecipe(null)}
            >
              <Text style={{ color: "#fff" }}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  name: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 14, color: "#555" },
  modalContent: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  instructions: { fontSize: 16, marginBottom: 20 },
  heartButton: { alignSelf: "center", marginVertical: 20 },
  closeButton: {
    backgroundColor: "#6C63FF",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
  },
});
