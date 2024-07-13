import { Image, StyleSheet, Text, View } from "react-native";

import Octicon from "../../../atom/octicon";
import { colors, fonts } from "../../../../constant";
import user_avatar from "../../../../assets/images/user_avatar.jpg";

const AnswerBox = ({ data }) => {
  return (
    <View style={dropdownContentStyles.container}>
      <Octicon name={"comment-discussion"} size={24} color={colors.primary} />
      <View style={{ width: "85%" }}>
        <Text style={dropdownContentStyles.title}>Phản hồi</Text>
        <Text style={dropdownContentStyles.content}>{data.content}</Text>
        <View style={dropdownContentStyles.authorContainer}>
          <Text style={styles.text}>Phản hồi từ</Text>
          <Image
            source={user_avatar}
            style={dropdownContentStyles.authorImage}
          />
          <Text style={styles.text}>{data.user.fullName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    fontFamily: fonts.BahnschriftRegular,
  },
});

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

export default AnswerBox;
