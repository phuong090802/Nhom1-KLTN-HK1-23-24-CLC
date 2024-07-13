import { Image, StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../../constant";
import user_avatar from "../../../assets/images/user_avatar.jpg";
import IconButton from "../../atom/icon-button";

export const ItemLayout = ({
  image,
  children,
  isSelected,
  infor,
  onExpand,
  text,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          {image !== undefined && (
            <View style={{ marginRight: 8 }}>
              <Image source={user_avatar} style={styles.image} />
            </View>
          )}
          <View style={styles.headerInfor}>
            <Text style={styles.title}>{text || "Không có tiêu đề"}</Text>
            {/* {!!infor && <Text style={styles.inforBox}>{infor}</Text>} */}
            {infor && (
              <View style={styles.inforContainer}>
                <Text style={styles.inforBox}>{infor}</Text>
              </View>
            )}
          </View>
        </View>
        {onExpand && (
          <View>
            <IconButton
              iconName={"triangle-down"}
              iconColor={"#fff"}
              onClick={onExpand}
            />
          </View>
        )}
      </View>
      <View
        style={[
          styles.dropdownContainer,
          isSelected ? styles.h_auto : styles.h_0,
        ]}
      >
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.black50,
            marginTop: 8,
          }}
        />
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.black10,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.BahnschriftBold,
    color: colors.black75,
  },
  header: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  inforContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  inforBox: {
    backgroundColor: colors.lightGray,
    paddingVertical: 2,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.black10,
    fontFamily: fonts.BahnschriftRegular,
    paddingHorizontal: 8,
  },
  image: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 16,
  },
  headerInfor: {
    flexDirection: "column",
    justifyContent: "center",
  },
  dropdownContainer: {
    overflow: "hidden",
  },
  h_0: {
    height: 0,
  },
  h_auto: {
    height: "auto",
  },
});
