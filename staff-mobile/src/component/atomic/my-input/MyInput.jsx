import { useCallback, useMemo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors, fonts } from '../../../../constance';

const MyInput = ({ onChangeText, name, variants, ...props }) => {
  const handleChange = useCallback(
    (value) => {
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
    width: '100%',
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
