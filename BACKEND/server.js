

// // ------------------------------
// // working
// // server.js
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors()); // ✅ Allow cross-origin requests
// app.use(express.json());

// // Root check
// app.get("/", (req, res) => {
//   res.send("✅ Backend server is running!");
// });

// /**
//  * 1️⃣ /get-food-items
//  */
// app.post("/get-food-items", async (req, res) => {
//   const { ingredients } = req.body;
//   if (!ingredients) {
//     return res.status(400).json({ error: "No ingredients provided." });
//   }

//   try {
//     const prompt = `Suggest 5 different dishes I can make using these ingredients: ${ingredients}.
//     Return only the dish names as a comma-separated list without numbering or extra text.`;

//     const geminiRes = await axios.post(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
//       { contents: [{ parts: [{ text: prompt }] }] },
//       {
//         headers: { "Content-Type": "application/json" },
//         params: { key: process.env.GEMINI_API_KEY },
//       }
//     );

//     const text =
//       geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
//     const foodItems = text
//       .split(",")
//       .map((item) => item.trim())
//       .filter(Boolean);

//     res.json({ foodItems });
//   } catch (err) {
//     console.error("❌ /get-food-items error:", err.response?.data || err.message);
//     res.status(500).json({ error: "Failed to fetch suggestions." });
//   }
// });

// /**
//  * 2️⃣ /get-food-image
//  */
// app.post("/get-food-image", async (req, res) => {
//   const { foodName } = req.body;
//   if (!foodName) {
//     return res.status(400).json({ error: "No food name provided." });
//   }

//   try {
//     const recipePrompt = `Give me a detailed, step-by-step recipe for ${foodName}.`;
//     const recipeRes = await axios.post(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
//       { contents: [{ parts: [{ text: recipePrompt }] }] },
//       {
//         headers: { "Content-Type": "application/json" },
//         params: { key: process.env.GEMINI_API_KEY },
//       }
//     );

//     const recipe =
//       recipeRes.data.candidates?.[0]?.content?.parts?.[0]?.text ||
//       "No recipe found.";

//     const imagePrompt = `A realistic, high-quality image of ${foodName}`;
//     const imageRes = await axios.post(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent",
//       { contents: [{ parts: [{ text: imagePrompt }] }] },
//       {
//         headers: { "Content-Type": "application/json" },
//         params: { key: process.env.GEMINI_API_KEY },
//       }
//     );

//     const imageBase64 =
//       imageRes.data.candidates?.[0]?.content?.parts?.[0]?.inline_data?.data ||
//       null;

//     if (!imageBase64) {
//       return res.status(500).json({ error: "Failed to generate image." });
//     }

//     const imageUrl = `data:image/png;base64,${imageBase64}`;
//     res.json({ imageUrl, recipe });
//   } catch (err) {
//     console.error("❌ /get-food-image error:", err.response?.data || err.message);
//     res.status(500).json({ error: "Failed to fetch image or recipe." });
//   }
// });

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running at http://192.168.1.36:${PORT}`);
// });

// // working



// -----------------------------------


// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("✅ Backend server is running!");
// });

// app.post("/get-recipe-details", async (req, res) => {
//   const { recipeName } = req.body;
//   if (!recipeName) return res.status(400).json({ text: "Recipe name missing." });

//   try {
//     const prompt = `Give me the recipe instructions for "${recipeName}" in this format only:

// Ingredients:
// - ingredient 1
// - ingredient 2

// Steps:
// 1. step one
// 2. step two
// 3. step three`;

//     const recipeRes = await axios.post(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
//       { contents: [{ parts: [{ text: prompt }] }] },
//       { headers: { "Content-Type": "application/json" }, params: { key: process.env.GEMINI_API_KEY } }
//     );

//     let rawText = recipeRes.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

//     // Clean markdown fences if Gemini adds them
//     rawText = rawText.replace(/```(json|markdown)?/g, "").trim();

//     console.log("🔎 Gemini response (raw text):", rawText);

//     res.json({ text: rawText });
//   } catch (err) {
//     console.error("❌ /get-recipe-details error:", err.response?.data || err.message);
//     res.status(500).json({ text: "Error fetching recipe." });
//   }
// });

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running at http://192.168.1.36:${PORT}`);
// });



// -------------------------------


const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.send("✅ Backend server is running!");
});

// 1️⃣ Get food items from ingredients
app.post("/get-food-items", async (req, res) => {
  const { ingredients, limit = 5 } = req.body;
  if (!ingredients) return res.status(400).json({ error: "No ingredients provided." });

  try {
    const prompt = `Suggest ${limit} different dishes I can make using these ingredients: ${ingredients}.
Return only the dish names as a comma-separated list without numbering or extra text.`;

    const geminiRes = await axios.post(
      // "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
     "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" }, params: { key: process.env.GEMINI_API_KEY } }
    );

    const text = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const foodItems = text.split(",").map(i => i.trim()).filter(Boolean);

    res.json({ foodItems });
  } catch (err) {
    console.error("❌ /get-food-items error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch suggestions." });
  }
});

// 2️⃣ Get detailed recipe instructions
app.post("/get-recipe-details", async (req, res) => {
  const { recipeName } = req.body;
  if (!recipeName) return res.status(400).json({ text: "Recipe name missing." });

  try {
    const prompt = `Give me the recipe instructions for "${recipeName}" in this format:

Ingredients:
- ingredient 1
- ingredient 2

Steps:
1. step one
2. step two
3. step three`;

    const recipeRes = await axios.post(
      // "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" }, params: { key: process.env.GEMINI_API_KEY } }
    );

    let rawText = recipeRes.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    rawText = rawText.replace(/```(json|markdown)?/g, "").trim();

    res.json({ text: rawText });
  } catch (err) {
    console.error("❌ /get-recipe-details error:", err.response?.data || err.message);
    res.status(500).json({ text: "Error fetching recipe." });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://192.168.1.36:${PORT}`);
});
