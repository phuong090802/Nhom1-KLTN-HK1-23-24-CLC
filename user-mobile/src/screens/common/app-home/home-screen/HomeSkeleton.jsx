import { StyleSheet, View } from "react-native";

import Skeleton from "../../../../atom/skeleton";

import { colors } from "../../../../../constant";

const HomeSkeleton = () => {
  return (
    <View style={styles.rootContainer}>
      <Skeleton width={250} height={25} style={styles.skeleton} />
      <View style={styles.skeletonContainer}>
        <Skeleton width={70} height={15} style={styles.skeleton} />
        <Skeleton width={70} height={15} style={styles.skeleton} />
        <Skeleton width={70} height={15} style={styles.skeleton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  rootContainer: {
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: "100%",
    borderWidth: 0.5,
    borderColor: colors.black10,
    backgroundColor: "#fff",
  },
  skeleton: {
    borderRadius: 8,
  },
  skeletonContainer: {
    flexDirection: "row",
    marginTop: 8,
    gap: 4,
  },
});

export default HomeSkeleton;
