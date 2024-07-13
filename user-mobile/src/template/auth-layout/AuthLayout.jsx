import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fonts } from '../../../constant';
import MaterialIcon from '../../atom/material-icon';
import TitleLogo from '../../atom/title-logo/TitleLogo';

const AuthLayout = ({ title, children, onBack }) => {
  const handleBack = useCallback(() => {
    if (!onBack) return;
    onBack();
  }, [onBack]);

  return (
    <>
      <StatusBar style='dark' />
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={['#2785DC', '#1DDBD2']}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.container}
        >
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <TitleLogo />
          </View>
          <View style={styles.formContainer}>
            <TouchableOpacity style={styles.formHeader} onPress={handleBack}>
              <MaterialIcon
                name={'arrow-back-ios-new'}
                size={24}
                color={'#4E504E'}
              />
              <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
            {children}
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#2785DC',
    fontFamily: fonts.BahnschriftRegular,
  },
  formContainer: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 40,
    paddingHorizontal: 32,
    paddingBottom: 8,
  },
  formHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    color: '#4E504E',
    marginLeft: 8,
    fontFamily: fonts.BahnschriftBold,
  },
});

export default AuthLayout;
