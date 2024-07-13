import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, fonts } from "../../../constant";
import MyIcon from "../../atom/my-icon";

const ModalLayout = ({ visible, children, onClose, title }) => {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      // onRequestClose={() => setVisible(false)}
      style={styles.layout}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.text}>{title}</Text>
            <TouchableOpacity style={styles.touchable} onPress={handleClose}>
              <MyIcon
                name="close"
                iconPackage="Ionicons"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  layout: {},
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.black25,
  },
  modal: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.black10,
    borderRadius: 16,
    maxWidth: "90%",
    width: "90%",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.black25,
    paddingBottom: 8,
    marginBottom: 16,
  },
  touchable: {
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  text: {
    fontSize: 24,
    fontFamily: fonts.BahnschriftBold,
    color: colors.primary,
  },
});

export default ModalLayout;
