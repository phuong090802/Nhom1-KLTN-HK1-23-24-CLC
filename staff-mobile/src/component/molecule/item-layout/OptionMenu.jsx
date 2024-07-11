import { Modal, StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../../../constance";
import MyIcon from "../../atomic/my-icon";
import { TouchableOpacity } from "react-native";
import { useMemo } from "react";

export const OptionMenu = ({
  visible,
  setVisible,
  onEdit,
  onDetail,
  onDelete,
}) => {
  const optionMenuComponent = useMemo(() => {
    return (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.container}>
          <View style={styles.content}>
            {onEdit && (
              <OptionButton
                title={"Chỉnh sửa"}
                onClick={() => {
                  setVisible(false);
                  if (onEdit) onEdit();
                }}
              />
            )}
            {onDetail && (
              <OptionButton
                title={"Chi tiết"}
                onClick={() => {
                  setVisible(false);
                  if (onDetail) onDetail();
                }}
                icon={{
                  package: "Ionicons",
                  name: "information-circle-outline",
                }}
              />
            )}
            {onDelete && (
              <OptionButton
                title={"Xóa"}
                onClick={() => {
                  setVisible(false);
                  if (onDelete) onDelete();
                }}
                icon={{
                  package: "Ionicons",
                  name: "close",
                }}
              />
            )}
            <OptionButton
              icon={{ package: "MaterialIcons", name: "exit-to-app" }}
              title={"Trở về"}
              onClick={() => setVisible((prev) => false)}
            />
          </View>
        </View>
      </Modal>
    );
  }, [visible, setVisible]);

  return optionMenuComponent;
};

const OptionButton = ({ icon, title, onClick }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={styles.buttonContainer}
      onPress={() => {
        if (onClick) onClick();
      }}
    >
      <MyIcon
        iconPackage={icon?.package || "Feather"}
        name={icon?.name || "edit-2"}
      />
      <Text style={styles.buttonTitle}>{title || "Option"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black5,
    flex: 1,
    flexDirection: "column-reverse",
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.primary10,
  },
  buttonTitle: {
    fontSize: 18,
    fontFamily: fonts.BahnschriftRegular,
  },
});
