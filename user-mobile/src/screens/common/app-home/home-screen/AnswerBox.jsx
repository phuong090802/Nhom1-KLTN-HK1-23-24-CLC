import { Image, StyleSheet, Text, View } from "react-native";

import user_avatar from "../../../../../assets/images/user_avatar.jpg";
import { colors, fonts } from "../../../../../constant";
import Octicon from "../../../../atom/octicon";
import { dropdownContentStyles } from "./const";
import RenderHTML, { useContentWidth } from "react-native-render-html";

const AnswerBox = ({ data }) => {
  const width = useContentWidth();

  return (
    <View style={dropdownContentStyles.container}>
      <Octicon name={"comment-discussion"} size={24} color={colors.primary} />
      <View style={{ width: "85%" }}>
        <Text style={dropdownContentStyles.title}>Phản hồi</Text>
        <RenderHTML source={{ html: data.content }} contentWidth={width} />
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

export default AnswerBox;
