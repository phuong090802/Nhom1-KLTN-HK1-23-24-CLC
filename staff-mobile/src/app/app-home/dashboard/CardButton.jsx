import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../../../constance';
import MyIcon from '../../../component/atomic/my-icon';

export const CardButton = ({ title, iconPackage, iconName, onPress, text }) => {
  const handlePress = useCallback(() => {
    if (onPress) onPress();
  }, [onPress]);

  const iconComponent = useMemo(() => {
    return (
      <View
        style={{
          padding: 8,
          backgroundColor: colors.primary20,
          borderRadius: 16,
        }}
      >
        <MyIcon
          iconPackage={iconPackage}
          name={iconName}
          size={30}
          color={colors.primary}
        />
      </View>
    );
  });

  return (
    <View style={styles.buttonStyle}>
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row' }}>{iconComponent}</View>
        <Text
          style={[
            styles.fontSize18,
            styles.fontBahnschriftBold,
            styles.colorBlack75,
          ]}
        >
          {title || 'Card Title'}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: 8,
        }}
      >
        <Text
          style={[
            styles.fontSize16,
            styles.fontBahnschrift,
            styles.colorBlack50,
          ]}
        >
          {text || 'unknow text'}
        </Text>
        {onPress && (
          <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
            <LinearGradient
              style={[{ borderRadius: 999, padding: 2 }]}
              colors={['#ABDCFF', '#0396FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MyIcon
                iconPackage="Entypo"
                name={'chevron-with-circle-right'}
                size={30}
                color={colors.white}
              />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  buttonStyle: {
    paddingVertical: 8,
    color: colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    gap: 8,
    flex: 1,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 1,
    borderWidth: 0.5,
    borderColor: colors.primary20,
  },

  colorBlack75: {
    color: colors.black75,
  },
  colorBlack50: {
    color: colors.black50,
  },
  fontSize18: {
    fontSize: 18,
  },
  fontSize16: {
    fontSize: 16,
  },
  fontBahnschrift: {
    fontFamily: fonts.BahnschriftRegular,
  },
  fontBahnschriftBold: {
    fontFamily: fonts.BahnschriftBold,
  },
});
