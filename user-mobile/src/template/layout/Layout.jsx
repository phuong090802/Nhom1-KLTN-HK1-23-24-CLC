import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./Header";
import { styles as headerStyles } from "./const";
import { colors } from "../../../constant";

const Layout = ({ children }) => {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.rootContainer}>
        <View style={headerStyles.container}>
          <Header />
          {children}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default Layout;
