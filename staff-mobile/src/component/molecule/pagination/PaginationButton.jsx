import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, fonts } from "../../../../constance";
import MyIcon from "../../atomic/my-icon";

const PaginationButton = ({ isSelected, page, onClick }) => {
  const buttonDisplay = useMemo(() => {
    switch (page) {
      case "first":
        return (
          <MyIcon
            iconPackage="Octicons"
            name={"chevron-left"}
            color={colors.white}
          />
        );
      case "last":
        return (
          <MyIcon
            iconPackage="Octicons"
            name={"chevron-right"}
            color={colors.white}
          />
        );
      default:
        return (
          <Text
            style={{
              color: colors.white,
              fontFamily: fonts.BahnschriftRegular,
              fontSize: 18,
            }}
          >
            {page}
          </Text>
        );
    }
  }, [page, isSelected]);

  return (
    <TouchableOpacity
      style={[
        styles.paginationButton,
        { backgroundColor: isSelected ? colors.error : colors.black },
      ]}
      activeOpacity={0.4}
      onPress={() => {
        if (onClick) onClick();
      }}
    >
      {buttonDisplay}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  paginationButton: {
    backgroundColor: colors.black,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});

export default PaginationButton;
