import { Image, StyleSheet, Text, View } from 'react-native';

import Octicon from '../../../../atom/octicon';
import { colors, fonts } from '../../../../../constant';
import { dropdownContentStyles } from './const';
import user_avatar from '../../../../../assets/images/user_avatar.jpg';

const AnswerBox = ({ data }) => {
  return (
    <View style={dropdownContentStyles.container}>
      <Octicon name={'comment-discussion'} size={24} color={colors.primary} />
      <View style={{ width: '85%' }}>
        <Text style={dropdownContentStyles.title}>Phản hồi</Text>
        <Text style={dropdownContentStyles.content}>{data.content}</Text>
        <View style={dropdownContentStyles.authorContainer}>
          <Text style={styles.text}>Phản hồi từ</Text>
          <Image
            source={user_avatar}
            style={dropdownContentStyles.authorImage}
          />
          <Text style={styles.text}>{data.user.fullName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    fontFamily: fonts.BahnschriftRegular,
  },
});

export default AnswerBox;
