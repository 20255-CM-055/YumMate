


// // // -----------------------------


// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Alert,
//   Modal,
// } from "react-native";
// import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { LikedRecipesContext } from "../LikedRecipesContext";
// import defaultProfileImg from '../assets/user2.jpeg'; // adjust path

// export default function ProfileScreen() {
//   const [profileImage, setProfileImage] = useState(Image.resolveAssetSource(defaultProfileImg).uri);
//   const [userName, setUserName] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [storedPassword, setStoredPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isEditingPassword, setIsEditingPassword] = useState(false);
//   const [newPassword, setNewPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [imageModalVisible, setImageModalVisible] = useState(false);
//   const [topPicksExpanded, setTopPicksExpanded] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const { likedRecipes } = useContext(LikedRecipesContext);

//   // Load user data
//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         const storedName = await AsyncStorage.getItem("userName");
//         const storedEmail = await AsyncStorage.getItem("userEmail");
//         const storedPass = await AsyncStorage.getItem("userPassword");
//         const storedPhone = await AsyncStorage.getItem("userPhone");
//         const storedImage = await AsyncStorage.getItem("profileImage");

//         if (storedName) { setUserName(storedName); setIsLoggedIn(true); }
//         if (storedEmail) setUserEmail(storedEmail);
//         if (storedPass) setStoredPassword(storedPass);
//         if (storedPhone) setPhoneNumber(storedPhone);
//         if (storedImage) setProfileImage(storedImage);
//       } catch (error) {
//         console.error("Failed to load user data:", error);
//       }
//     };
//     loadUserData();
//   }, []);

//   const pickImage = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       Alert.alert("Permission required", "You need to allow access to your photos.");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const selectedUri = result.assets[0].uri;
//       setProfileImage(selectedUri);
//       await AsyncStorage.setItem("profileImage", selectedUri);
//     }
//   };

//   const savePassword = async () => {
//     if (!newPassword || newPassword.length < 6) {
//       Alert.alert("Error", "Password must be at least 6 characters.");
//       return;
//     }
//     setStoredPassword(newPassword);
//     await AsyncStorage.setItem("userPassword", newPassword);
//     setIsEditingPassword(false);
//     setNewPassword("");
//     setShowPassword(false);
//     Alert.alert("Success", "Password changed successfully.");
//   };

//   const handleLogout = async () => {
//     if (!isLoggedIn) {
//       Alert.alert("Already Logged Out", "You are already logged out.");
//       return;
//     }

//     Alert.alert(
//       "Logout",
//       "Are you sure you want to log out?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Yes",
//           onPress: async () => {
//             await AsyncStorage.multiRemove([
//               "userName",
//               "userEmail",
//               "userPassword",
//               "userPhone",
//               "profileImage",
//               "likedRecipes",
//             ]);
//             setProfileImage(Image.resolveAssetSource(defaultProfileImg).uri);
//             setUserName("");
//             setUserEmail("");
//             setStoredPassword("");
//             setPhoneNumber("");
//             setNewPassword("");
//             setIsEditingPassword(false);
//             setShowPassword(false);
//             setTopPicksExpanded(false);
//             setIsLoggedIn(false);
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   // Ensure ingredients is always an array
//   const safeLikedRecipes = likedRecipes.map(item => ({
//     ...item,
//     ingredients: Array.isArray(item.ingredients) ? item.ingredients : [],
//   }));

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Top Background */}
//         <View style={styles.topBackground}>
//           <Text style={styles.headerTitle}>Profile</Text>
//           <TouchableOpacity
//             style={styles.notificationIcon}
//             onPress={() =>
//               Alert.alert("No Notifications", "You have no notifications right now.")
//             }
//           >
//             <Ionicons name="notifications-outline" size={26} color="white" />
//           </TouchableOpacity>
//         </View>

//         {/* Profile Image */}
//         <View style={styles.profileImageContainer}>
//           <TouchableOpacity onPress={() => profileImage && setImageModalVisible(true)}>
//             <Image
//               source={{ uri: profileImage }}
//               style={styles.profileImage}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
//             <MaterialIcons name="edit" size={20} color="white" />
//           </TouchableOpacity>
//         </View>

//         {/* Image Modal */}
//         <Modal visible={imageModalVisible} transparent={true}>
//           <View style={styles.modalBackground}>
//             <TouchableOpacity
//               style={styles.closeBtn}
//               onPress={() => setImageModalVisible(false)}
//             >
//               <Ionicons name="close" size={28} color="white" />
//             </TouchableOpacity>
//             <Image
//               source={{ uri: profileImage }}
//               style={styles.fullImage}
//               resizeMode="contain"
//             />
//           </View>
//         </Modal>

//         {/* User Info */}
//         <View style={styles.fieldContainer}>
//           <View style={styles.fieldLabelRow}>
//             <FontAwesome name="user" size={20} color="#9C27B0" />
//             <Text style={styles.label}>Full name</Text>
//           </View>
//           <TextInput style={styles.input} value={userName} editable={false} />
//         </View>

//         <View style={styles.fieldContainer}>
//           <View style={styles.fieldLabelRow}>
//             <MaterialIcons name="email" size={20} color="#9C27B0" />
//             <Text style={styles.label}>Email</Text>
//           </View>
//           <TextInput style={styles.input} value={userEmail} editable={false} />
//         </View>

//         <View style={styles.fieldContainer}>
//           <View style={styles.fieldLabelRow}>
//             <FontAwesome name="phone" size={20} color="#9C27B0" />
//             <Text style={styles.label}>Phone number</Text>
//           </View>
//           <TextInput style={styles.input} value={phoneNumber} editable={false} />
//         </View>

//         {/* Password Section */}
//         <View style={styles.fieldContainer}>
//           <View style={styles.fieldLabelRow}>
//             <MaterialIcons name="lock" size={20} color="#9C27B0" />
//             <Text style={styles.label}>Password</Text>
//           </View>
//           {isEditingPassword ? (
//             <View style={styles.passwordEditRow}>
//               <TextInput
//                 style={[styles.input, { flex: 1 }]}
//                 placeholder="Enter new password"
//                 value={newPassword}
//                 onChangeText={setNewPassword}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#666" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={savePassword}>
//                 <Text style={styles.saveText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <View style={styles.passwordRow}>
//               <TextInput
//                 style={[styles.input, { flex: 1 }]}
//                 value={showPassword ? storedPassword : "•".repeat(storedPassword.length)}
//                 editable={false}
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#666" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setIsEditingPassword(true)}>
//                 <Text style={styles.changeText}>Change</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {/* Top Picks / Liked Recipes */}
//         <View style={styles.fieldContainer}>
//           <TouchableOpacity
//             style={styles.dropdownHeader}
//             onPress={() => setTopPicksExpanded(!topPicksExpanded)}
//           >
//             <View style={styles.fieldLabelRow}>
//               <Ionicons name="heart" size={20} color="#FF3B3B" />
//               <Text style={styles.label}>Top Picks</Text>
//             </View>
//             <Ionicons
//               name={topPicksExpanded ? "chevron-up" : "chevron-down"}
//               size={20}
//               color="#666"
//             />
//           </TouchableOpacity>

//           {topPicksExpanded && (
//             safeLikedRecipes.length === 0 ? (
//               <Text style={{ color: "#666", padding: 10 }}>No liked recipes yet.</Text>
//             ) : (
//               safeLikedRecipes.map((item, index) => (
//                 <View key={index} style={{ paddingVertical: 5 }}>
//                   <Text style={styles.dropdownItemText}>{item.title}</Text>
//                   {item.ingredients.length > 0 && (
//                     <Text style={styles.dropdownItemDetail}>
//                       {item.ingredients.join(", ")}
//                     </Text>
//                   )}
//                 </View>
//               ))
//             )
//           )}
//         </View>

//         {/* Logout */}
//         <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   topBackground: {
//     backgroundColor: "#a246b2ff",
//     height: 200,
//     borderBottomLeftRadius: 300,
//     borderBottomRightRadius: 300,
//     width: "160%",
//     alignSelf: "center",
//     marginBottom: -60,
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//   },
//   headerTitle: { fontSize: 26, fontWeight: "bold", color: "#fff" },
//   notificationIcon: {
//     position: "absolute",
//     top: 50,
//     marginLeft: 300,
//     borderColor: "snow",
//     borderWidth: 1,
//     borderRadius: 20,
//     padding: 5,
//   },
//   scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
//   profileImageContainer: { alignItems: "center", marginBottom: 20, position: "relative", marginTop: -20 },
//   profileImage: { width: 150, height: 150, borderRadius: 80, borderWidth: 3, borderColor: "#fff" },
//   editIcon: { position: "absolute", bottom: -10, right: "36%", backgroundColor: "#9C27B0", padding: 6, borderRadius: 18, borderWidth: 2, borderColor: "#fff" },
//   modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center" },
//   fullImage: { width: "90%", height: "80%" },
//   closeBtn: { position: "absolute", top: 40, right: 20, zIndex: 10 },
//   fieldContainer: { marginBottom: 15, marginTop: 20 },
//   fieldLabelRow: { flexDirection: "row", alignItems: "center" },
//   label: { fontSize: 15, color: "#666", marginLeft: 6 },
//   input: { backgroundColor: "#fff", paddingVertical: 10, fontSize: 16, borderBottomWidth: 1, borderBottomColor: "#eee", color: "#000" },
//   passwordRow: { flexDirection: "row", alignItems: "center" },
//   passwordEditRow: { flexDirection: "row", alignItems: "center" },
//   changeText: { color: "#9C27B0", fontWeight: "bold", marginLeft: 10 },
//   saveText: { color: "#28a745", fontWeight: "bold", marginLeft: 10 },
//   dropdownHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: "#eee" },
//   dropdownItemText: { fontSize: 16, color: "#333", paddingLeft: 10 },
//   dropdownItemDetail: { fontSize: 14, color: "#555", paddingLeft: 20, paddingBottom: 5 },
//   logoutBtn: { backgroundColor: "#9C27B0", paddingVertical: 15, marginTop: 20, borderRadius: 8 },
//   logoutText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
// });



// --------------------------



import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LikedRecipesContext } from "../LikedRecipesContext";
import defaultProfileImg from "../assets/user.jpeg"; // adjust path if needed

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(Image.resolveAssetSource(defaultProfileImg).uri);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [topPicksExpanded, setTopPicksExpanded] = useState(false);

  const { likedRecipes, setLikedRecipes } = useContext(LikedRecipesContext);

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedPass = await AsyncStorage.getItem("userPassword");
        const storedPhone = await AsyncStorage.getItem("userPhone");
        const storedImage = await AsyncStorage.getItem("profileImage");

        if (storedName) setUserName(storedName);
        if (storedEmail) setUserEmail(storedEmail);
        if (storedPass) setStoredPassword(storedPass);
        if (storedPhone) setPhoneNumber(storedPhone);
        if (storedImage) setProfileImage(storedImage);
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    loadUserData();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "You need to allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setProfileImage(selectedUri);
      await AsyncStorage.setItem("profileImage", selectedUri);
    }
  };

  const savePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }
    setStoredPassword(newPassword);
    await AsyncStorage.setItem("userPassword", newPassword);
    setIsEditingPassword(false);
    setNewPassword("");
    setShowPassword(false);
    Alert.alert("Success", "Password changed successfully.");
  };

  const handleLogout = async () => {
    if (!userEmail && !userName) {
      Alert.alert("Already Logged Out", "You are already logged out.");
      return;
    }

    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            await AsyncStorage.multiRemove([
              "userName",
              "userEmail",
              "userPassword",
              "userPhone",
              "profileImage",
              "likedRecipes",
            ]);

            setProfileImage(Image.resolveAssetSource(defaultProfileImg).uri);
            setUserName("");
            setUserEmail("");
            setStoredPassword("");
            setPhoneNumber("");
            setNewPassword("");
            setIsEditingPassword(false);
            setShowPassword(false);
            setTopPicksExpanded(false);

            if (setLikedRecipes) setLikedRecipes([]);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const safeLikedRecipes = likedRecipes.map(item => ({
    ...item,
    ingredients: Array.isArray(item.ingredients) ? item.ingredients : [],
  }));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Background */}
        <View style={styles.topBackground}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={() => Alert.alert("No Notifications", "You have no notifications right now.")}
          >
            <Ionicons name="notifications-outline" size={26} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={() => profileImage && setImageModalVisible(true)}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <MaterialIcons name="edit" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Image Modal */}
        <Modal visible={imageModalVisible} transparent={true}>
          <View style={styles.modalBackground}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setImageModalVisible(false)}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
            <Image source={{ uri: profileImage }} style={styles.fullImage} resizeMode="contain" />
          </View>
        </Modal>

        {/* User Info */}
        <View style={styles.fieldContainer}>
          <View style={styles.fieldLabelRow}>
            <FontAwesome name="user" size={20} color="#9C27B0" />
            <Text style={styles.label}>Full name</Text>
          </View>
          <TextInput style={styles.input} value={userName} editable={false} />
        </View>

        <View style={styles.fieldContainer}>
          <View style={styles.fieldLabelRow}>
            <MaterialIcons name="email" size={20} color="#9C27B0" />
            <Text style={styles.label}>Email</Text>
          </View>
          <TextInput style={styles.input} value={userEmail} editable={false} />
        </View>

        <View style={styles.fieldContainer}>
          <View style={styles.fieldLabelRow}>
            <FontAwesome name="phone" size={20} color="#9C27B0" />
            <Text style={styles.label}>Phone number</Text>
          </View>
          <TextInput style={styles.input} value={phoneNumber} editable={false} />
        </View>

        {/* Password Section */}
        <View style={styles.fieldContainer}>
          <View style={styles.fieldLabelRow}>
            <MaterialIcons name="lock" size={20} color="#9C27B0" />
            <Text style={styles.label}>Password</Text>
          </View>
          {isEditingPassword ? (
            <View style={styles.passwordEditRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity onPress={savePassword}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={showPassword ? storedPassword : "•".repeat(storedPassword.length)}
                editable={false}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsEditingPassword(true)}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Top Picks */}
        <View style={styles.fieldContainer}>
          <TouchableOpacity style={styles.dropdownHeader} onPress={() => setTopPicksExpanded(!topPicksExpanded)}>
            <View style={styles.fieldLabelRow}>
              <Ionicons name="heart" size={20} color="#FF3B3B" />
              <Text style={styles.label}>Top Picks</Text>
            </View>
            <Ionicons name={topPicksExpanded ? "chevron-up" : "chevron-down"} size={20} color="#666" />
          </TouchableOpacity>

          {topPicksExpanded && (
            safeLikedRecipes.length === 0 ? (
              <Text style={{ color: "#666", padding: 10 }}>No liked recipes yet.</Text>
            ) : (
              safeLikedRecipes.map((item, index) => (
                <View key={index} style={{ paddingVertical: 5 }}>
                  <Text style={styles.dropdownItemText}>{item.title}</Text>
                  {/* {item.ingredients.length > 0 && (
                    <Text style={styles.dropdownItemDetail}>{item.ingredients.join(", ")}</Text>
                  )} */}
                </View>
              ))
            )
          )}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topBackground: {
    backgroundColor: "#a246b2ff",
    height: 200,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    width: "160%",
    alignSelf: "center",
    marginBottom: -60,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerTitle: { fontSize: 26, fontWeight: "bold", color: "#fff" },
  notificationIcon: { position: "absolute", top: 50, marginLeft: 300, borderColor: "snow", borderWidth: 1, borderRadius: 20, padding: 5 },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  profileImageContainer: { alignItems: "center", marginBottom: 20, position: "relative", marginTop: -20 },
  profileImage: { width: 150, height: 150, borderRadius: 80, borderWidth: 3, borderColor: "#fff" },
  editIcon: { position: "absolute", bottom: -10, right: "36%", backgroundColor: "#9C27B0", padding: 6, borderRadius: 18, borderWidth: 2, borderColor: "#fff" },
  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center" },
  fullImage: { width: "90%", height: "80%" },
  closeBtn: { position: "absolute", top: 40, right: 20, zIndex: 10 },
  fieldContainer: { marginBottom: 15, marginTop: 20 },
  fieldLabelRow: { flexDirection: "row", alignItems: "center" },
  label: { fontSize: 15, color: "#666", marginLeft: 6 },
  input: { backgroundColor: "#fff", paddingVertical: 10, fontSize: 16, borderBottomWidth: 1, borderBottomColor: "#eee", color: "#000" },
  passwordRow: { flexDirection: "row", alignItems: "center" },
  passwordEditRow: { flexDirection: "row", alignItems: "center" },
  changeText: { color: "#9C27B0", fontWeight: "bold", marginLeft: 10 },
  saveText: { color: "#28a745", fontWeight: "bold", marginLeft: 10 },
  dropdownHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: "#eee" },
  dropdownItemText: { fontSize: 16, color: "#333", paddingLeft: 10 },
  dropdownItemDetail: { fontSize: 14, color: "#555", paddingLeft: 20, paddingBottom: 5 },
  logoutBtn: { backgroundColor: "#9C27B0", paddingVertical: 15, marginTop: 20, borderRadius: 8 },
  logoutText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
});
