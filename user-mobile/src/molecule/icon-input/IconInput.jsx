import { useCallback } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

import { colors, fonts } from "../../../constant";
import MyIcon from "../../atom/my-icon";

const IconInput = ({
  name,
  icon,
  iconColor,
  iconSize,
  iconPackage,
  placeholder,
  keyboardType,
  secureTextEntry,
  onChange,
  value,
  onBlur,
  errorMessage,
  boxStyle,
}) => {
  const handleTextChange = useCallback(
    (text) => {
      if (!onChange) return;
      else if (!name) onChange(text);
      else onChange(name, text);
    },
    [onChange, name]
  );

  const handleBlur = useCallback(() => {
    if (!onBlur) return;
    onBlur();
  }, [onBlur]);

  return (
    <View style={[style.container, boxStyle ? boxStyle : style.default]}>
      <View style={style.icon}>
        <MyIcon
          iconPackage={iconPackage}
          name={icon}
          size={iconSize || 24}
          color={iconColor || colors.black75}
        />
      </View>
      <TextInput
        style={style.iconInput}
        placeholder={placeholder || ""}
        keyboardType={keyboardType || "default"}
        secureTextEntry={secureTextEntry}
        defaultValue={value}
        onChangeText={handleTextChange}
        onBlur={handleBlur}
      />
      {errorMessage && errorMessage !== "" && (
        <Text style={style.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // overflow: "hidden",
    position: "relative",
  },
  default: { borderWidth: 1, borderColor: colors.black10, borderRadius: 16 },
  icon: {
    height: 44,
    display: "flex",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 8,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  iconInput: {
    flex: 1,
    height: 44,
    backgroundColor: "#fff",
    fontFamily: fonts.BahnschriftRegular,
    fontSize: 16,
    paddingRight: 24,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  errorMessage: {
    position: "absolute",
    left: 0,
    bottom: -18,
    fontSize: 13,
    color: colors.error,
    fontFamily: fonts.BahnschriftRegular,
  },
});

export default IconInput;
