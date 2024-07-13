import { StyleSheet, Text, View } from "react-native";

import { colors, fonts } from "../../../../constant";
import Octicon from "../../../atom/octicon";

const QuestionBox = ({ content }) => {
  return (
    <View style={dropdownContentStyles.container}>
      <Octicon name={"comment"} size={24} color={colors.primary} />
      <View style={{ width: "85%" }}>
        <Text style={dropdownContentStyles.title}>Câu hỏi</Text>
        <Text style={dropdownContentStyles.content}>{content}</Text>
      </View>
    </View>
  );
};

const dropdownContentStyles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 2,
    borderTopColor: colors.black10,
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  title: { fontSize: 16, fontFamily: fonts.BahnschriftBold },
  content: {
    fontSize: 16,
    fontFamily: fonts.BahnschriftRegular,
    width: "95%",
    textAlign: "justify",
    color: colors.black75,
  },
  authorImage: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  authorContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
  },
});

export default QuestionBox;
