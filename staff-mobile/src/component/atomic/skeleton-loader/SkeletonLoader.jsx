import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { colors } from "../../../../constance";

const SkeletonLoader = ({ width, height, style }) => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      })
    ).start();
  }, [width]);
  return (
    <View
      style={StyleSheet.flatten([
        {
          width: width,
          height: height,
          backgroundColor: "rgba(0,0,0,0.12)",
          overflow: "hidden",
        },
        style,
      ])}
    >
      <Animated.View
        style={{ height: "100%", width: "100%", transform: [{ translateX }] }}
      >
        <LinearGradient
          style={{ height: "100%", width: "100%" }}
          colors={["transparent", "rgba(0, 0, 0, 0.15)", "transparent"]}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
};

export default SkeletonLoader;
