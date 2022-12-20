import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { auth } from "../../../firebaseConfig";
import { useAuthStore } from "../../store/auth";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    setLoading(true);
    if (password !== passwordConfirmation) {
      alert("Passwords don't match.");
      setLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with uid: ", user.uid);
        setLoading(false);
        useAuthStore.setState({
          user: {
            id: user?.uid,
            email: user?.email,
            name: user?.displayName
          },
          isSignedIn: true
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Confirm Password"
        onChangeText={(text) => setPasswordConfirmation(text)}
        value={passwordConfirmation}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onRegisterPress()}
        disabled={loading}
      >
        <Text style={styles.buttonTitle}>Create account</Text>
      </TouchableOpacity>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          Already got an account?{" "}
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    height: 48,
    width: "100%",
    borderRadius: 10,
    marginVertical: 10
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
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
