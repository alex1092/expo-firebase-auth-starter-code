import { sendPasswordResetEmail } from "@firebase/auth";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { auth } from "../../../firebaseConfig";

export const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onResetPasswordPress = () => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
        setLoading(false);
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
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onResetPasswordPress()}
        disabled={loading}
      >
        <Text style={styles.buttonTitle}>Reset Password</Text>
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
    backgroundColor: "#F5FCFF",
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
