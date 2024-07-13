import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

import { colors, fonts } from "../../../constant";
import MyIcon from "../../atom/my-icon";

const MySelect = ({
  name,
  data,
  onChange,
  defaultOption,
  iconName,
  iconSize,
  iconColor,
  iconPackage,
  placeholder,
  width,
}) => {

  const handleSelect = useCallback(
    (value) => {
      if (!onChange) return;
      if (!name) {
        onChange(value);
      } else {
        onChange(name, value);
      }
    },
    [onChange]
  );

  return (
    <View style={[styles.container, width && { width: width }]}>
      <SelectList
        setSelected={(value) => handleSelect(value)}
        data={data}
        save="key"
        boxStyles={[styles.boxStyles, iconName && { paddingLeft: 40 }]}
        inputStyles={styles.inputStyles}
        dropdownStyles={styles.dropdownStyles}
        defaultOption={defaultOption || { key: "null", value: "Tất cả" }}
        placeholder={placeholder || "Select options"}
        search={false}
      />
      <View style={styles.icon}>
        {iconName && iconPackage && (
          <MyIcon
            name={iconName}
            iconPackage={iconPackage}
            size={iconSize || 24}
            color={iconColor || "#000"}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    height: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    left: 9,
  },
  boxStyles: {
    backgroundColor: "#fff",
    height: 44,
    borderWidth: 1,
    borderColor: colors.black10,
    borderRadius: 16,
    marginTop: 0,
    width: "100%",
  },
  inputStyles: {
    fontFamily: fonts.BahnschriftRegular,
    fontSize: 16,
    color: colors.black75,
  },
  dropdownStyles: {
    backgroundColor: "#fff",
  },
});

export default MySelect;
