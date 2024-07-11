import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors, fonts } from "../../../../constance";
import MyIcon from "../../atomic/my-icon";
import { router } from "expo-router";

const ModalLayout = ({ visible, onClose, title, children }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.content} activeOpacity={0.9}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => {
                if (onClose) onClose();
              }}
            >
              <MyIcon
                iconPackage="Ionicons"
                name="chevron-back"
                size={36}
                color={colors.black75}
              />
            </TouchableOpacity>
            <Text style={styles.text}>{title || "Text Required"}</Text>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column-reverse",
    backgroundColor: colors.black10,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  text: {
    fontSize: 24,
    fontFamily: fonts.BahnschriftBold,
    color: colors.black75,
    flex: 1,
  },
});

export default ModalLayout;
