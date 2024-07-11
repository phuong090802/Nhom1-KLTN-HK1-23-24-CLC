import React, { useContext } from "react";
import { Text, View } from "react-native";
import { AppContext } from "../../AppProvider";
import { HomePageProvider } from "./HomePageProvider";
import { HomePageContent } from "./HomePageContent";

const HomePage = () => {
  const {} = useContext(AppContext);

  return (
    <HomePageProvider>
      <HomePageContent />
    </HomePageProvider>
  );
};

export default HomePage;
