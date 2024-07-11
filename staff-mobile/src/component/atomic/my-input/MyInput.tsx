import React, { FC, useCallback, useMemo, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { colors, fonts } from "../../../../constance";

interface iInputProps extends TextInputProps {
  variants: "default" | "underline";
  name: String;
}

const MyInput: FC<iInputProps> = ({
  onChangeText,
  name,
  variants,
  ...props
}) => {
  const handleChange = useCallback(
    (value: String) => {
      onChangeText(value, name);
    },
    [onChangeText]
  );

  const myInputComponent = useMemo(() => {
    return (
      <View style={styles.container}>
        <TextInput
          selectionColor={colors.black75}
          style={styles[variants]}
          onChangeText={handleChange}
          {...props}
        />
      </View>
    );
  }, [onChangeText, name, variants]);

  return myInputComponent;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  default: {
    backgroundColor: colors.black5,
    paddingVertical: 16,
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: fonts.BahnschriftRegular,
  },
  input: {},
});

export default MyInput;
