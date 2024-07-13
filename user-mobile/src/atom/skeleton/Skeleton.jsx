import { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, StyleSheet, View } from 'react-native';

const Skeleton = ({ width, height, style }) => {
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
        styles.rootContainer,
        style,
        { width: width, height: height },
      ])}
    >
      <Animated.View
        style={[
          styles.insideContainer,
          { transform: [{ translateX: translateX }] },
        ]}
      >
        <LinearGradient
          style={styles.linearGradient}
          colors={['transparent', 'rgba(0, 0, 0, 0.07)', 'transparent']}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',
  },
  insideContainer: {
    width: '100̀',
    height: '100̀',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
  },
});

export default Skeleton;
