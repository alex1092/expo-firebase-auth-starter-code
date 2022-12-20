import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { auth } from "../../../firebaseConfig";
import { useAuthStore } from "../../store/auth";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onFooterLinkPress = () => {
    navigation.navigate("Register");
  };

  const onLoginPress = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoading(false);
        useAuthStore.setState({
          user: { id: user?.uid, email: user?.email, name: user.displayName },
          isSignedIn: true
        });

        // ...
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        setLoading(false);
        // ..
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        value={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onLoginPress()}
        disabled={loading}
      >
        <Text style={styles.buttonTitle}>Log in</Text>
      </TouchableOpacity>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            Sign up
          </Text>
        </Text>
        <Text style={styles.footerText}>
          Forgot Password?{" "}
          <Text
            onPress={() => navigation.navigate("ForgotPassword")}
            style={styles.footerLink}
          >
            Reset Password
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30
  },
  input: {
    height: 50,
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#000000",
    marginBottom: 30,
    fontSize: 20
  },
  button: {
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    marginHorizontal: 30,
    width: "100%"
  },
  buttonTitle: {
    color: "white",
    fontSize: 24
  },
  footerView: {
    alignItems: "center",
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d"
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16
  }
});
