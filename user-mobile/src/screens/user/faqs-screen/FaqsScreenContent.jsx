import { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../../../constant";
import TitleBar from "../../../molecule/title-bar";
import { FaqsStoreContext } from "./FaqsScreenStore";
import { Item } from "./Item";
import { FaqsSkeletons } from "./FaqsSkeletons";

export const FaqsScreenContent = () => {
  const { faqs, handleLazy, loading } = useContext(FaqsStoreContext);

  return (
    <View style={styles.containner}>
      <TitleBar title={"Thư viện câu hỏi"} />
      <ScrollView
        style={{ marginTop: 8 }}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => handleLazy(nativeEvent)}
      >
        {!!faqs && faqs.map((faq) => <Item key={faq._id} data={faq} />)}
        {loading && <FaqsSkeletons />}
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
