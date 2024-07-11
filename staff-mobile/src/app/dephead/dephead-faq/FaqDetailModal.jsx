import React, { useContext } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { colors, fonts } from "../../../../constance";
import MyIcon from "../../../component/atomic/my-icon";
import ModalLayout from "../../../component/molecule/modal-layout";
import { DepheadFaqContext } from "./DepheadFaqProvider";

export const FaqDetailModal = () => {
  const { showFaqDetailModal, setShowFaqDetailModal, selectedFaq } =
    useContext(DepheadFaqContext);

  const { width } = useWindowDimensions();

  return (
    <ModalLayout
      visible={showFaqDetailModal}
      onClose={() => setShowFaqDetailModal(false)}
      title={"Chi tiết Faq"}
    >
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={[styles.title]}>{selectedFaq?.question}</Text>
        </View>
        <RenderHTML
          source={{ html: selectedFaq?.answer }}
          contentWidth={width}
        />
        {selectedFaq.answerAttachment !== null && (
          <View style={{ width: "100%", marginTop: 8 }}>
            <Text style={[styles.text, { fontSize: 18 }, styles.bold]}>
              Đính kèm:
            </Text>
            <File link={selectedFaq.answerAttachment} />
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
  container: {
    marginTop: 8,
    gap: 8,
    borderWidth: 0.5,
    padding: 16,
    borderRadius: 16,
  },
  text: { color: colors.black75 },
  bold: { fontFamily: fonts.BahnschriftBold },
  regular: { fontFamily: fonts.BahnschriftRegular },
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
  title: {
    fontFamily: fonts.BahnschriftBold,
    fontSize: 18,
  },
});
