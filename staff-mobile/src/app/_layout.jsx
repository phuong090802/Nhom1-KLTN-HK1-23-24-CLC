import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useCallback } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppProvider from "./AppProvider";

const AppLayout = () => {
  const [fontsLoaded, fontsError] = useFonts({
    BahnschriftBold: require("../../assets/fonts/BahnschriftBold.ttf"),
    BahnschriftRegular: require("../../assets/fonts/BahnschriftRegular.ttf"),
    Bungee: require("../../assets/fonts/Bungee.ttf"),
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
    <AppProvider>
      <View style={{ flex: 1 }} onLayoutRootView={onLayoutRootView}>
        <StatusBar />
        <SafeAreaView />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="app-home" />
        </Stack>
      </View>
    </AppProvider>
  );
};

export default AppLayout;
