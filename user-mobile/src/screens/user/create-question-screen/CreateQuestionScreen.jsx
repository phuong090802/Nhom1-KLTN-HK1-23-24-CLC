import { useContext } from 'react';
import { Text, View } from 'react-native';
import { colors, fonts } from '../../../../constant';
import { DataContext } from '../../../store/Store';
import CreateQuestionContent from './CreateQuestionContent';
import CreateQuestionStore from './CreateQuestionStore';

const CreateQuestionScreen = () => {
  const { user } = useContext(DataContext);
  console.log('CreateQuestionScreen', user);
  return (
    <>
      {user.isLoggedIn ? (
        <CreateQuestionStore>
          <CreateQuestionContent />
        </CreateQuestionStore>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: fonts.BahnschriftBold,
              fontSize: 18,
              color: colors.black75,
            }}
          >
            Vui lòng đăng nhập để đặt câu hỏi!!
          </Text>
        </View>
      )}
    </>
  );
};

export default CreateQuestionScreen;
