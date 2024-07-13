import React, { useContext, useMemo } from "react";
import { ItemLayout } from "../../../template/item-layout/ItemLayout";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";
import { convertDateTime } from "../../../util/convert.util";
import { NewsScreenContext } from "./NewsScreenStore";
import { colors, fonts } from "../../../../constant";

export const Item = ({ data }) => {
  const { selected, setSelected } = useContext(NewsScreenContext);

  const handleExpand = () => {
    if (selected === data._id) setSelected(-1);
    else setSelected(data._id);
  };

  const openLink = () => {
    Linking.openURL(data.file).catch((err) =>
      console.error("Không thể mở liên kết:", err)
    );
  };

  const fileComponent = useMemo(() => {
    const returnComponent = (
      <View style={{ flexDirection: "row" }}>
        {/* <Text>Xem thông tin chi tiết: </Text> */}
        <Image
          source={{ uri: data.file }}
          style={{ flex: 1, resizeMode: "contain", width: null, height: 150 }}
        />
        {/* <TouchableOpacity onPress={openLink}>
          <Text
            style={{ color: colors.primary, textDecorationLine: "underline" }}
          >
            Tại đây
          </Text>
        </TouchableOpacity> */}
      </View>
    );
    return returnComponent;
  }, [data]);
  return (
    <ItemLayout
      text={data.title}
      infor={convertDateTime(data.createdAt)}
      isSelected={selected === data._id}
      onExpand={handleExpand}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{data.content}</Text>
        {!!data.file && fileComponent}
      </View>
    </ItemLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    borderWidth: 2,
    borderColor: colors.black25,
    padding: 8,
    borderRadius: 8,
  },
  text: {
    fontFamily: fonts.BahnschriftRegular,
    fontSize: 16,
  },
});
