
// // ---------------------------------


// import React, { useEffect, useState, useContext } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   ImageBackground,
// } from "react-native";
// import axios from "axios";
// import { LikedRecipesContext } from "../LikedRecipesContext";

// export default function RecipeDetailsModal({ route, navigation }) {
//   const { recipeName } = route.params;
//   const [recipeDetails, setRecipeDetails] = useState({ ingredients: "", steps: "" });
//   const [loading, setLoading] = useState(true);

//   const { likedRecipes, toggleLike } = useContext(LikedRecipesContext);

//   // Robust parser for Gemini responses
//   const parseRecipe = (text) => {
//     const cleanedText = text.replace(/```(json|markdown)?/g, "").trim();

//     // Ingredients: capture everything between "Ingredients:" and "Steps:"
//     const ingredientsMatch = cleanedText.match(/Ingredients:\s*([\s\S]*?)\n\s*Steps:/i);
//     const stepsMatch = cleanedText.match(/Steps:\s*([\s\S]*)/i);

//     const ingredients = ingredientsMatch
//       ? ingredientsMatch[1]
//           .split("\n")
//           .map((i) => i.replace(/^[-\*\s]+/, "").trim())
//           .filter(Boolean)
//           .join("\n")
//       : "Ingredients not found.";

//     const steps = stepsMatch ? stepsMatch[1].trim() : "Steps not found.";

//     return { ingredients, steps };
//   };

//   useEffect(() => {
//     if (!recipeName) return;

//     const fetchRecipeDetails = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.post("http://192.168.1.36:3000/get-recipe-details", { recipeName });
//         const text = res.data.text || "No instructions found.";
//         const parsed = parseRecipe(text);
//         setRecipeDetails(parsed);
//       } catch (err) {
//         console.error("❌ Failed to fetch recipe:", err);
//         setRecipeDetails({ ingredients: "Ingredients not found.", steps: "Steps not found." });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipeDetails();
//   }, [recipeName]);

//   const isLiked = likedRecipes.some((r) => r.title === recipeName);

//   return (
//     <ImageBackground
//       source={require("../assets/modalbg2.jpeg")}
//       style={styles.bgImage}
//       resizeMode="cover"
//     >
//       {loading ? (
//         <View style={styles.loaderContainer}>
//           <View style={styles.bubbleContainer}>
//             <View style={styles.bubble} />
//             <View style={styles.bubble} />
//             <View style={styles.bubble} />
//           </View>
//           <Text style={styles.loadingText}>Loading instructions...</Text>
//         </View>
//       ) : (
//         <ScrollView style={styles.container}>
//           {/* Back Button */}
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Text style={styles.backText}>⬅ Back</Text>
//           </TouchableOpacity>

//           {/* Header */}
//           <View style={styles.header}>
//             <Text style={styles.title}>{recipeName}</Text>
//             <TouchableOpacity
//               style={[styles.likeButton, isLiked && styles.liked]}
//               onPress={() =>
//                 toggleLike({
//                   title: recipeName,
//                   // ingredients: recipeDetails.ingredients.split("\n"),
//                 })
//               }
//             >
//               <Text style={styles.likeText}>{isLiked ? "❤️" : "🖤"}</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Ingredients */}
//           {/* <Text style={styles.sectionTitle}>🛒 Ingredients:</Text> */}
//           {/* <Text style={styles.recipeText}>{recipeDetails.ingredients}</Text> */}

//           {/* Steps */}
//           <Text style={styles.sectionTitle}>👩‍🍳 Steps:</Text>
//           <Text style={styles.recipeText}>{recipeDetails.steps}</Text>

//           {/* Chef’s Tip */}
//           <Text style={styles.tipText}>
//             ✨ Chef’s tip: Cooking with love makes everything taste better! 💕
//           </Text>
//         </ScrollView>
//       )}
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   bgImage: { flex: 1 },
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: "rgba(255,255,255,0.65)",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
//   bubbleContainer: { flexDirection: "row", marginBottom: 10 },
//   bubble: { width: 12, height: 12, marginHorizontal: 5, borderRadius: 6, backgroundColor: "#9C27B0" },
//   loadingText: { fontSize: 16, color: "#555", fontWeight: "500" },
//   backButton: { backgroundColor: "#f3e5f5", paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, alignSelf: "flex-start", marginBottom: 16 },
//   backText: { color: "#9C27B0", fontWeight: "600", fontSize: 16 },
//   header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
//   title: { fontSize: 26, fontWeight: "bold", flexShrink: 1, color: "#9C27B0", textAlign: "center", textShadowColor: "rgba(0,0,0,0.25)", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 6 },
//   likeButton: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25, marginLeft: 10 },
//   liked: { backgroundColor: "#ff6347", shadowColor: "#ff6347", shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 },
//   likeText: { fontSize: 18, fontWeight: "bold", color: "white" },
//   sectionTitle: { fontSize: 20, fontWeight: "bold", marginTop: 15, marginBottom: 5, color: "#9C27B0" },
//   recipeText: { fontSize: 16, lineHeight: 24, color: "#333" },
//   tipText: { marginTop: 20, padding: 12, borderLeftWidth: 4, borderLeftColor: "#9C27B0", backgroundColor: "#f3e5f5", borderRadius: 8, fontStyle: "italic", fontSize: 16, color: "#6a1b9a" },
// });



// -----------------------------


import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { LikedRecipesContext } from "../LikedRecipesContext";

export default function RecipeDetailsModal({ route, navigation }) {
  const { recipeName } = route.params;
  const [recipeDetails, setRecipeDetails] = useState({ ingredients: "", steps: "" });
  const [loading, setLoading] = useState(true);

  const { likedRecipes, toggleLike } = useContext(LikedRecipesContext);

  // Function to clean Markdown and extra symbols
  const cleanText = (text) => {
    return text
      .replace(/```(json|markdown)?/g, "") // remove code blocks
      .replace(/\*\*/g, "") // remove bold
      .replace(/\*/g, "") // remove asterisks
      .replace(/^\s+|\s+$/g, "") // trim leading/trailing spaces
      .trim();
  };

  // Parse Gemini API response into ingredients and steps
  const parseRecipe = (text) => {
    const cleanedText = cleanText(text);

    const ingredientsMatch = cleanedText.match(/Ingredients:\s*([\s\S]*?)\n\s*Steps:/i);
    const stepsMatch = cleanedText.match(/Steps:\s*([\s\S]*)/i);

    const ingredients = ingredientsMatch
      ? ingredientsMatch[1]
          .split("\n")
          .map((i) => i.replace(/^[\-\*\s]+/, "").trim())
          .filter(Boolean)
          .join("\n")
      : "Ingredients not found.";

    const steps = stepsMatch
      ? stepsMatch[1]
          .split("\n")
          .map((s) => s.replace(/^[\-\*\s]+/, "").trim())
          .filter(Boolean)
          .join("\n")
      : "Steps not found.";

    return { ingredients, steps };
  };

  useEffect(() => {
    if (!recipeName) return;

    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.post("http://192.168.1.36:3000/get-recipe-details", { recipeName });
        const text = res.data.text || "No instructions found.";
        const parsed = parseRecipe(text);
        setRecipeDetails(parsed);
      } catch (err) {
        console.error("❌ Failed to fetch recipe:", err);
        setRecipeDetails({ ingredients: "Ingredients not found.", steps: "Steps not found." });
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeName]);

  const isLiked = likedRecipes.some((r) => r.title === recipeName);

  return (
    <ImageBackground
      source={require("../assets/modalbg2.jpeg")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      {loading ? (
        <View style={styles.loaderContainer}>
          <View style={styles.bubbleContainer}>
            <View style={styles.bubble} />
            <View style={styles.bubble} />
            <View style={styles.bubble} />
          </View>
          <Text style={styles.loadingText}>Loading instructions...</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>⬅ Back</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{recipeName}</Text>
            <TouchableOpacity
              style={[styles.likeButton, isLiked && styles.liked]}
              onPress={() =>
                toggleLike({
                  title: recipeName,
                  ingredients: recipeDetails.ingredients.split("\n"),
                })
              }
            >
              <Text style={styles.likeText}>{isLiked ? "❤️" : "🖤"}</Text>
            </TouchableOpacity>
          </View>

          {/* Ingredients */}
          <Text style={styles.sectionTitle}>🛒 Ingredients:</Text>
          <Text style={styles.recipeText}>{recipeDetails.ingredients}</Text>

          {/* Steps */}
          <Text style={styles.sectionTitle}>👩‍🍳 Steps:</Text>
          <Text style={styles.recipeText}>{recipeDetails.steps}</Text>

          {/* Chef’s Tip */}
          <Text style={styles.tipText}>
            ✨ Chef’s tip: Cooking with love makes everything taste better! 💕
          </Text>
        </ScrollView>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: { flex: 1 },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.65)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  bubbleContainer: { flexDirection: "row", marginBottom: 10 },
  bubble: { width: 12, height: 12, marginHorizontal: 5, borderRadius: 6, backgroundColor: "#9C27B0" },
  loadingText: { fontSize: 16, color: "#555", fontWeight: "500" },
  backButton: { backgroundColor: "#f3e5f5", paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, alignSelf: "flex-start", marginBottom: 16 },
  backText: { color: "#9C27B0", fontWeight: "600", fontSize: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 26, fontWeight: "bold", flexShrink: 1, color: "#9C27B0", textAlign: "center", textShadowColor: "rgba(0,0,0,0.25)", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 6 },
  likeButton: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25, marginLeft: 10 },
  liked: { backgroundColor: "#ff6347", shadowColor: "#ff6347", shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 },
  likeText: { fontSize: 18, fontWeight: "bold", color: "white" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginTop: 15, marginBottom: 5, color: "#9C27B0" },
  recipeText: { fontSize: 16, lineHeight: 24, color: "#333" },
  tipText: { marginTop: 20, padding: 12, borderLeftWidth: 4, borderLeftColor: "#9C27B0", backgroundColor: "#f3e5f5", borderRadius: 8, fontStyle: "italic", fontSize: 16, color: "#6a1b9a" },
});
