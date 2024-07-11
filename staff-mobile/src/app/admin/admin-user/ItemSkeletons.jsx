import { useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../../../constance";
import SkeletonLoader from "../../../component/atomic/skeleton-loader";
import { AdminUserContext } from "./AdminUserProvider";

export const ItemSkeletons = () => {
  const { loading } = useContext(AdminUserContext);
  const itemSkeletonsComponent = useMemo(() => {
    const componentArray = new Array(5).fill(null);
    return componentArray.map((_, index) => {
      return (
        !!loading && (
          <View key={index} style={styles.container}>
            <SkeletonLoader
              height={28}
              width={200}
              style={{
                borderRadius: 8,
              }}
            />
            <View style={{ flexDirection: "row", gap: 8 }}>
              <SkeletonLoader
                height={36}
                width={36}
                style={{ borderRadius: 999 }}
              />
            </View>
          </View>
        )
      );
    });
  }, [loading]);

  return itemSkeletonsComponent;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderColor: colors.lightGray,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  skeleton: {
    borderRadius: 8,
  },
});
