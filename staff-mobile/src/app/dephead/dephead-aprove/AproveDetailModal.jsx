import React, { useContext } from "react";
import ModalLayout from "../../../component/molecule/modal-layout";
import { DepheadAproveContext } from "./DepheadAproveProvider";
import {
  Linking,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { colors, fonts } from "../../../../constance";
import RenderHTML from "react-native-render-html";
import MyIcon from "../../../component/atomic/my-icon";
import { depheadAproveAnswer } from "../../../service/dephead/depheadAprove.sv";
import { useAuthSocket } from "../../../hooks/useAuthSocket";

export const AproveDetailModal = () => {
  const { width } = useWindowDimensions();

  const { authSocket } = useAuthSocket();

  const { showDetailModal, setShowDetailModal, selectedAnswer, getAnswers } =
    useContext(DepheadAproveContext);

  const handleAprove = async () => {
    try {
      // const response = await depheadAproveAnswer(selectedAnswer._id);
      const response = await authSocket.emitWithAck("approve-answer:create", {
        questionId: selectedAnswer._id,
      });
      console.log(response);
      ToastAndroid.show(
        response.message || "Đã duyệt câu trả lời",
        ToastAndroid.SHORT
      );
      getAnswers();
      setShowDetailModal(false);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        error.message || "Lỗi khi duyệt câu trả lời",
        ToastAndroid.SHORT
      );
    }
  };

  const handleFeedback = async () => {
    try {
      const response = await authSocket.emitWithAck("feedback:create", {
        questionId: selectedAnswer._id,
        content: "",
      });
      console.log(response);
      ToastAndroid.show(
        response.message || "Đã từ chối câu trả lời",
        ToastAndroid.SHORT
      );
      getAnswers();
      setShowDetailModal(false);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        error.message || "Lỗi khi từ chối câu trả lời",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <ModalLayout
      visible={showDetailModal}
      onClose={() => {
        setShowDetailModal(false);
      }}
      title={"Duyệt câu trả lời"}
    >
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={[styles.text, { fontSize: 18 }, styles.bold]}>
            Câu hỏi:
          </Text>
          <RenderHTML
            source={{ html: selectedAnswer?.content }}
            contentWidth={width}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text style={[styles.text, { fontSize: 18 }, styles.bold]}>
            Phản hồi:
          </Text>
          <Text
            style={[
              styles.text,
              { fontSize: 16, textAlign: "justify" },
              styles.regular,
            ]}
          >
            <RenderHTML
              source={{ html: selectedAnswer?.answer?.content }}
              contentWidth={width}
            />
          </Text>
        </View>
        {selectedAnswer?.answer?.fileUrl !== null && (
          <View style={{ width: "100%" }}>
            <Text style={[styles.text, { fontSize: 18 }, styles.bold]}>
              Đính kèm:
            </Text>
            <File link={selectedAnswer?.answer?.fileUrl} />
          </View>
        )}
        <View style={{ width: "100%", flexDirection: "row-reverse", gap: 8 }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.error }]}
            onPress={handleFeedback}
          >
            <Text style={[{ color: colors.white }, styles.regular]}>
              Từ chối
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.success }]}
            onPress={handleAprove}
          >
            <Text style={[{ color: colors.white }, styles.regular]}>Duyệt</Text>
          </TouchableOpacity>
        </View>
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
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
