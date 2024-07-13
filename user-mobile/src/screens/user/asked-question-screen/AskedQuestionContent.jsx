import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '../../../../constant';
import TitleBar from '../../../molecule/title-bar';
import { AskedQuestionContext } from './AskedQuestionStore';
import { FakeData } from './const';
import { DropdownItem } from './DropDownItem';

export const AskedQuestionContent = () => {
  const context = useContext(AskedQuestionContext);

  const navigation = useNavigation();

  const handleItemSelect = (id) => {
    if (id === context.selected) {
      context.setSelected(-1);
    } else {
      context.setSelected(id);
    }
  };

  return (
    <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
      <TitleBar
        title={'Câu hỏi đã hỏi'}
        onBack={() => {
          navigation.navigate('UserMenu');
        }}
      />
      <View style={{ marginTop: 8 }}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => handleLazy(nativeEvent)}
        >
          {FakeData.map((question) => {
            return (
              <DropdownItem
                key={question._id}
                data={question}
                id={question._id}
                isOpen={context.selected === question._id}
                onSelect={() => handleItemSelect(question._id)}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
