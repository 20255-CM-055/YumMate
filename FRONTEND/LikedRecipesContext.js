
// // --------------------------



// import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const LikedRecipesContext = createContext();

// export const LikedRecipesProvider = ({ children }) => {
//   const [likedRecipes, setLikedRecipes] = useState([]);

//   // Load liked recipes from storage on mount
//   useEffect(() => {
//     const loadLikes = async () => {
//       try {
//         const storedLikes = await AsyncStorage.getItem("likedRecipes");
//         if (storedLikes) setLikedRecipes(JSON.parse(storedLikes));
//       } catch (error) {
//         console.error("Failed to load liked recipes:", error);
//       }
//     };
//     loadLikes();
//   }, []);

//   const toggleLike = async (recipe) => {
//     // recipe = { title: "Recipe Name", ingredients: ["ing1","ing2"] }
//     let updatedLikes;
//     const exists = likedRecipes.find((r) => r.title === recipe.title);

//     if (exists) {
//       // Remove from liked
//       updatedLikes = likedRecipes.filter((r) => r.title !== recipe.title);
//     } else {
//       // Add to liked at the top
//       updatedLikes = [recipe, ...likedRecipes];
//     }

//     setLikedRecipes(updatedLikes);

//     try {
//       await AsyncStorage.setItem("likedRecipes", JSON.stringify(updatedLikes));
//     } catch (error) {
//       console.error("Failed to save liked recipes:", error);
//     }
//   };

//   return (
//     <LikedRecipesContext.Provider value={{ likedRecipes, toggleLike }}>
//       {children}
//     </LikedRecipesContext.Provider>
//   );
// };



// -----------------------------------


import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LikedRecipesContext = createContext();

export const LikedRecipesProvider = ({ children }) => {
  const [likedRecipes, setLikedRecipes] = useState([]);

  // Load liked recipes from storage on mount
  useEffect(() => {
    const loadLikes = async () => {
      try {
        const storedLikes = await AsyncStorage.getItem("likedRecipes");
        if (storedLikes) setLikedRecipes(JSON.parse(storedLikes));
      } catch (error) {
        console.error("Failed to load liked recipes:", error);
      }
    };
    loadLikes();
  }, []);

  const toggleLike = async (recipe) => {
    // recipe = { title: "Recipe Name", ingredients: ["ing1","ing2"] }
    let updatedLikes;
    const exists = likedRecipes.find((r) => r.title === recipe.title);

    if (exists) {
      // Remove from liked
      updatedLikes = likedRecipes.filter((r) => r.title !== recipe.title);
    } else {
      // Add to liked at the top
      updatedLikes = [recipe, ...likedRecipes];
    }

    setLikedRecipes(updatedLikes);

    try {
      await AsyncStorage.setItem("likedRecipes", JSON.stringify(updatedLikes));
    } catch (error) {
      console.error("Failed to save liked recipes:", error);
    }
  };

  return (
    <LikedRecipesContext.Provider value={{ likedRecipes, toggleLike, setLikedRecipes }}>
      {children}
    </LikedRecipesContext.Provider>
  );
};
