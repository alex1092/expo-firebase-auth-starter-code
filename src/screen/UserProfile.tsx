import { View, Button, Text, StyleSheet } from "react-native";
import { useAuthStore } from "../store/auth";

import { getAuth, signOut } from "firebase/auth";

export const UserProfile = () => {
  const { user } = useAuthStore();

  const auth = getAuth();

  const signOutPress = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        useAuthStore.setState({ isSignedIn: false, user: null });
      })
      .catch((error) => {
        // An error happened.
        console.log("error", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Profile</Text>
      <Text style={styles.text}>{user?.email}</Text>
      <Button title="Sign Out" onPress={signOutPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 20
  }
});
