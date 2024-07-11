import { FC, useMemo } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { colors, fonts } from "../../../../constance";

interface iButtonProps extends TouchableOpacityProps {
  buttonText: String;
  variant: "default" | "outline";
}

const MyButton: FC<iButtonProps> = ({
  buttonText,
  variant,
  style,
  onPress,
  ...props
}) => {
  const myButtonComponent = useMemo(() => {
    const buttonStyle = [
      styles[!!variant && !!styles[variant] ? variant : "default"],
      style,
    ];

    return (
      <View style={styles.container}>
        <TouchableOpacity {...props} style={buttonStyle} onPress={onPress}>
          <Text style={styles.titleDefault}>{buttonText || "Button"}</Text>
        </TouchableOpacity>
      </View>
    );
  }, [variant, style, buttonText, onPress]);

  return myButtonComponent;
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  default: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 32,
  },
  titleDefault: {
    fontSize: 18,
    fontFamily: fonts.BahnschriftBold,
    color: colors.white,
  },
});

export default MyButton;
