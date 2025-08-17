


// // --------------------------

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';

// import HomeScreen from '../screens/HomeScreen';
// import ChatbotScreen from '../screens/ChatbotScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// const Tab = createBottomTabNavigator();

// export default function MainTabs({ route }) {
//   // Get user info from login/signup
//   const userEmail = route.params?.userEmail || '';
//   const userName = route.params?.userName || '';

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ focused, color }) => {
//           let iconName;
//           if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
//           else if (route.name === 'Chatbot') iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
//           else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
//           return <Ionicons name={iconName} size={24} color={color} />;
//         },
//         tabBarActiveTintColor: '#9C27B0',
//         tabBarInactiveTintColor: 'gray',
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} initialParams={{ userName }} />
//       <Tab.Screen name="Chatbot" component={ChatbotScreen} initialParams={{ userEmail }} options={{ tabBarLabel: 'ChefBot' }}/>
//       <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ userEmail }} />
//     </Tab.Navigator>
//   );
// }




// ---------------------------


// --------------------------

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs({ route }) {
  // Get user info from login/signup
  const userEmail = route.params?.userEmail || '';
  const userName = route.params?.userName || '';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let iconSize = focused ? 28 : 24; // bigger for active tab
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Chatbot') iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: '#9C27B0',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: ({ focused }) => ({
          fontSize: focused ? 14 : 12, // bigger label for active tab
          fontWeight: focused ? 'bold' : 'normal',
        }),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{ userName }} />
      <Tab.Screen
        name="Chatbot"
        component={ChatbotScreen}
        initialParams={{ userEmail }}
        options={{ tabBarLabel: 'ChefBot' }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ userEmail }} />
    </Tab.Navigator>
  );
}
