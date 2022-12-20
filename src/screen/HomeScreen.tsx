import { View, Text, StyleSheet } from "react-native";
import { useAuthStore } from "../store/auth";

export const HomeScreen = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>{user?.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
