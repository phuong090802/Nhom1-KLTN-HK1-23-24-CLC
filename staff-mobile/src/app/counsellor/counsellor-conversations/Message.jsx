import { StyleSheet, View } from 'react-native';
import RenderHTML, { useContentWidth } from 'react-native-render-html';
import { colors, fonts } from '../../../../constance';

export const Message = ({ sender, content }) => {
  const width = useContentWidth();

  return (
    <View style={[styles.wrapper, sender ? styles.sender : styles.receiver]}>
      <RenderHTML
        source={{ html: content || '<p></p>' }}
        contentWidth={width}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: '75%',
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  sender: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    alignSelf: 'flex-start',
    backgroundColor: colors.primary20,
  },
  receiver: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    alignSelf: 'flex-end',
    backgroundColor: colors.success10,
  },
  text: {
    fontFamily: fonts.BahnschriftRegular,
    fontSize: 18,
  },
});
