// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/screen/HomeScreen";
import { LoginScreen } from "./src/screen/auth/LoginScreen";
import { RegisterScreen } from "./src/screen/auth/RegisterScreen";
import { ForgotPasswordScreen } from "./src/screen/auth/ForgotPasswordScreen";
import { useAuthStore } from "./src/store/auth";
import { UserProfile } from "./src/screen/UserProfile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);

  React.useEffect(() => {
    console.log("isSignedIn", isSignedIn);
  }, [isSignedIn]);

  return !isSignedIn ? (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  ) : (
    <TabNavigation />
  );
};

function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
