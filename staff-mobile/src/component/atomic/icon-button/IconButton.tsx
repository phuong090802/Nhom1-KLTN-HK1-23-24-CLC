import React, { FC, useMemo } from "react";
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import MyIcon from "../my-icon";
import { MyIconProps } from "../my-icon/MyIcon";

interface iIconButton extends MyIconProps, TouchableOpacityProps {
  buttonSize: "sm" | "md" | "lg";
  buttonColor: ColorValue;
}

const IconButton: FC<iIconButton> = ({
  buttonSize,
  color,
  iconPackage,
  size,
  buttonColor,
  name,
  onPress,
  disabled,
  ...props
}) => {
  const iconButtonComponent = useMemo(() => {
    const btnSize = buttonSize === "lg" ? 36 : buttonSize === "sm" ? 24 : 30;
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={disabled ? 1 : 0.5}
        onPress={onPress}
        disabled={disabled}
        {...props}
      >
        <View
          style={[styles.button, { backgroundColor: buttonColor || "#E3E7EA" }]}
        >
          <MyIcon
            color={color}
            iconPackage={iconPackage}
            size={btnSize}
            name={name}
          />
        </View>
      </TouchableOpacity>
    );
  }, [buttonSize, color, iconPackage, name, buttonColor]);

  return iconButtonComponent;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: { padding: 4, borderRadius: 16 },
});

export default IconButton;
