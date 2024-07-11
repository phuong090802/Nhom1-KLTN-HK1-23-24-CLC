import React, { useContext } from "react";
import ModalLayout from "../../../component/molecule/modal-layout";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { AdminNewsContext } from "./AdminNewsProvider";
import RenderHTML, { useContentWidth } from "react-native-render-html";
import { colors, fonts } from "../../../../constance";
import MyIcon from "../../../component/atomic/my-icon";

export const DetailNewsModal = () => {
  const { showDetailModal, setShowDetailModal, selectedNews } =
    useContext(AdminNewsContext);

  const { width } = useWindowDimensions();

  const onModalClose = () => {
    setShowDetailModal(false);
  };

  return (
    <ModalLayout
      visible={showDetailModal}
      onClose={onModalClose}
      title={"Tin tức"}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{selectedNews?.title}</Text>
        <RenderHTML
          source={{ html: selectedNews?.content }}
          contentWidth={width}
        />
        {selectedNews?.file !== null && (
          <View style={{ width: "100%", marginTop: 8 }}>
            <Text style={[styles.text, { fontSize: 18 }, styles.bold]}>
              Đính kèm:
            </Text>
            <File link={selectedNews?.file} />
          </View>
        )}
      </View>
    </ModalLayout>
  );
};

const File = ({ link }) => {
  return (
    <View style={styles.fileContainer}>
      <Text
        style={{
          fontSize: 18,
          fontFamily: fonts.BahnschriftRegular,
          color: colors.black75,
        }}
      >
        File
      </Text>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => {
          Linking.openURL(link);
        }}
      >
        <MyIcon
          name={"paperclip"}
          iconPackage="Feather"
          color={colors.black75}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { color: colors.black75 },
  container: {
    marginTop: 8,
    gap: 8,
    borderWidth: 0.5,
    padding: 16,
    borderRadius: 16,
  },
  bold: { fontFamily: fonts.BahnschriftBold },
  title: {
    fontFamily: fonts.BahnschriftBold,
    fontSize: 18,
  },
  fileContainer: {
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    backgroundColor: colors.primary20,
    borderColor: colors.black10,
    alignItems: "center",
  },
});
