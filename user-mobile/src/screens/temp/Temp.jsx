import { Dimensions, View } from 'react-native';

import HomeSkeletonGroup from '../common/app-home/home-screen/HomeSkeletonGroup';

const Temp = () => {
  const cardWidth = Dimensions.get('window').width - 32;
  // const skeWidth = cardWidth - 32;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: cardWidth,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HomeSkeletonGroup />
      </View>
    </View>
  );
};

export default Temp;
