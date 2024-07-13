import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import TitleBar from '../../../molecule/title-bar';

export const NotiScreenContent = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
      <TitleBar
        title={'Thông báo'}
        onBack={() => navigation.navigate('AppHome')}
      />
    </View>
  );
};
