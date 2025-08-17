// // ----------------------------


// // App.js


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';
// import MainTabs from './navigation/MainTabs';
// import BrowseRecipes from './screens/BrowseRecipes';
// import ProfileScreen from './screens/ProfileScreen';
// import RecipeDetailsModal from './screens/RecipeDetailsModal';
// // Import the provider
// import { LikedRecipesProvider } from './LikedRecipesContext';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <LikedRecipesProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Signup" component={SignupScreen} />
//           <Stack.Screen name="MainTabs" component={MainTabs} />
//           <Stack.Screen name="BrowseRecipes" component={BrowseRecipes} />
//           <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//           <Stack.Screen 
//             name="RecipeDetails" 
//             component={RecipeDetailsModal} 
//             options={{ headerShown: false }}  // 👈 hide header for full-screen modal look
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </LikedRecipesProvider>
//   );
// }



// ------------------------------------------

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MainTabs from './navigation/MainTabs';
import BrowseRecipes from './screens/BrowseRecipes';
import RecipeDetailsModal from './screens/RecipeDetailsModal';

// Provider for liked recipes
import { LikedRecipesProvider } from './LikedRecipesContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LikedRecipesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="BrowseRecipes" component={BrowseRecipes} />
          <Stack.Screen 
            name="RecipeDetails" 
            component={RecipeDetailsModal} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LikedRecipesProvider>
  );
}
