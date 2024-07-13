import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';

import HomeSkeleton from './HomeSkeleton';

const HomeSkeletonGroup = () => {
  return (
    <View
      style={styles.rootContainer}
      showsVerticalScrollIndicator={false}
    >
      <HomeSkeleton />
      <HomeSkeleton />
      <HomeSkeleton />
      <HomeSkeleton />
      <HomeSkeleton />
      <HomeSkeleton />
      <HomeSkeleton />
      <HomeSkeleton />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    rowGap: 8,
    width: '100%',
    flex: 1,
  },
});

export default HomeSkeletonGroup;
