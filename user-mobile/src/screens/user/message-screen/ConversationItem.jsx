import { useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";
import user_avatar from "../../../../assets/images/user_avatar.jpg";
import { DataContext } from "../../../store/Store";
import { colors, fonts } from "../../../../constant";
import { MessageScreenContext } from "./MessageScreenStore";
import { useNavigation } from "@react-navigation/native";
import { truncateHTML } from "../../../util/convert.util";

export const ConversationItem = ({ data }) => {
  const { width } = useWindowDimensions();

  const {
    setSelectedConversationId,
    selectedConversation,
    setSelectedConversation,
  } = useContext(DataContext);

  const { user } = useContext(DataContext);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.6}
      onPress={() => {
        setSelectedConversationId(data._id);
        setSelectedConversation(data);
        navigation.navigate("DetailMessage");
      }}
    >
      <Image source={user_avatar} style={styles.avatar} />
      <View style={{ justifyContent: "center" }}>
        <Text style={[styles.fontBahnschriftBold, { fontSize: 18 }]}>
          {data?.otherUser?.fullName || "Người dùng"}
        </Text>
        <View style={{ flexDirection: "row", gap: 4 }}>
          {user?._id === data.lastMessage.sender && (
            <Text style={[styles.fontBahnschrifd, { fontSize: 16 }]}>Bạn:</Text>
          )}
          <RenderHTML
            source={{ html: truncateHTML(data.lastMessage?.content, 30) }}
            contentWidth={width}
            baseStyle={{
              fontFamily: fonts.BahnschriftRegular,
              marginVertical: -0,
            }}
            systemFonts={[fonts.BahnschriftRegular]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: "row",
    gap: 8,
    borderBottomWidth: 0.2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  fontBahnschriftBold: {
    fontFamily: fonts.BahnschriftBold,
  },
  fontBahnschrifd: {
    fontFamily: fonts.BahnschriftRegular,
  },
});
