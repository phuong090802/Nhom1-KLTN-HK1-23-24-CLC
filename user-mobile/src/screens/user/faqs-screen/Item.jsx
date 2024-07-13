import { StyleSheet, Text, View } from "react-native";
import { ItemLayout } from "../../../template/item-layout/ItemLayout";
import { useContext } from "react";
import { FaqsStoreContext } from "./FaqsScreenStore";
import Octicon from "../../../atom/octicon";
import { colors, fonts } from "../../../../constant";

export const Item = ({ data }) => {
  const { selected, setSelected } = useContext(FaqsStoreContext);

  const handleExpand = () => {
    if (selected === data._id) {
      setSelected(-1);
    } else {
      setSelected(data._id);
    }
  };

  return (
    <ItemLayout
      text={data.question}
      isSelected={selected === data._id}
      onExpand={handleExpand}
      infor={data.department}
    >
      <View style={styles.container}>
        <Octicon name={"comment-discussion"} size={24} color={colors.primary} />
        <View style={{ width: "85%" }}>
          <Text style={styles.title}>Phản hồi</Text>
          <Text style={styles.text}>{data.answer}</Text>
        </View>
      </View>
    </ItemLayout>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 8, flexDirection: "row", gap: 8 },
  title: {
    fontFamily: fonts.BahnschriftBold,
    fontSize: 18,
    color: colors.black75,
  },
  text: {
    fontFamily: fonts.BahnschriftRegular,
    fontSize: 16
  },
});
