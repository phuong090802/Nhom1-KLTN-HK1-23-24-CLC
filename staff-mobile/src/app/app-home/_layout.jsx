import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import NavigationBar from "../../component/molecule/navigation-bar";

const AppLayout = () => {
  return (
    <>
      <StatusBar />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="dashboard/index" />
        <Stack.Screen name="home-page/index" />
      </Stack>
      <NavigationBar />
    </>
  );
};

export default AppLayout;
