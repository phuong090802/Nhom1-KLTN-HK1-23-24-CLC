import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import AppHome from "./src/screens/common/app-home";
import ForgotPassword from "./src/screens/common/forgot-password";
import Login from "./src/screens/common/login";
import Register from "./src/screens/common/register";
import temp from "./src/screens/temp";
import askedQuestionScreen from "./src/screens/user/asked-question-screen";
import MenuScreen from "./src/screens/user/menu-screen/MenuScreen";
import NotiScreen from "./src/screens/user/noti-screen";
import Store from "./src/store/Store";
import MessageScreen from "./src/screens/user/message-screen";
import { DetailConversation } from "./src/screens/user/message-screen/DetailConversation";

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("App is running");

  const [fontsLoaded, fontsError] = useFonts({
    BahnschriftBold: require("./assets/fonts/BahnschriftBold.ttf"),
    BahnschriftRegular: require("./assets/fonts/BahnschriftRegular.ttf"),
    Bungee: require("./assets/fonts/Bungee.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontsError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <View style={style.root} onLayoutRootView={onLayoutRootView}>
      <Store>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AppHome"
            // initialRouteName="Temp"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="AppHome" component={AppHome} />
            <Stack.Screen name="UserMenu" component={MenuScreen} />
            <Stack.Screen
              name="AskedQuestion"
              component={askedQuestionScreen}
            />
            <Stack.Screen name="Noti" component={NotiScreen} />
            <Stack.Screen name="Temp" component={temp} />
            <Stack.Screen name="Message" component={MessageScreen} />
            <Stack.Screen name="DetailMessage" component={DetailConversation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Store>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
});
