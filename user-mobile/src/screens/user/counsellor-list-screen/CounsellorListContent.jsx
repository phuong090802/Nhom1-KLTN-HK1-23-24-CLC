import { ScrollView, StyleSheet, Text, View } from "react-native";
import TitleBar from "../../../molecule/title-bar";
import { colors } from "../../../../constant";
import { useContext } from "react";
import { CounsellorListContext } from "./CounsellorListStore";
import { Item } from "./Item";

export const CounsellorListContent = () => {
  const { counsellors, handleLazy } = useContext(CounsellorListContext);

  return (
    <View style={styles.containner}>
      <TitleBar title={"Danh sách tư vấn viên"} />
      <ScrollView
        style={{ marginTop: 8 }}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => handleLazy(nativeEvent)}
      >
        {counsellors &&
          counsellors.map((counsellor) => (
            <Item key={counsellor._id} data={counsellor} />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
