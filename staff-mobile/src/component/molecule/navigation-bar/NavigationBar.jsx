import { router, usePathname } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { colors, paths } from "../../../../constance";
import IconButton from "../../atomic/icon-button";

const NavigationBar = () => {
  const pathName = usePathname();


  const handleNavigation = (path) => {
    if (pathName === path) return;
    router.replace(path);
  };

  const navigationBarComponent = useMemo(() => {
    const getColor = (buttonPath) => {
      const selected = pathName === buttonPath;
      return {
        color: selected ? colors.white : colors.black75,  
        buttonColor: selected ? colors.primary : undefined,
        activeOpacity: selected ? 1 : 0.5,
        disabled: selected,
      };
    };
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <IconButton
            iconPackage="MaterialCommunityIcons"
            name={"view-dashboard-outline"}
            onPress={() => handleNavigation(paths.dashboard)}
            {...getColor(paths.dashboard)}
          />
          <IconButton
            iconPackage="Feather"
            name={"home"}
            onPress={() => handleNavigation(paths.home)}
            {...getColor(paths.home)}
          />
          <IconButton
            iconPackage="FontAwesome5"
            name={"user-circle"}
            onPress={() => handleNavigation(paths.user)}
            {...getColor(paths.user)}
          />
        </View>
      </View>
    );
  }, [pathName]);

  return navigationBarComponent;
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#EFEFF0",
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  navbar: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default NavigationBar;
