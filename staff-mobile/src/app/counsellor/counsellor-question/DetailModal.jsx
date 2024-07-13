import { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import { colors, fonts } from '../../../../constance';
import MyIcon from '../../../component/atomic/my-icon';
import ModalLayout from '../../../component/molecule/modal-layout';
import { AnswerQuestionModal } from './AnswerQuestionModal';
import { CounsellorQuestionContext } from './CounsellorQuestionProvider';

export const DetailModal = () => {
  const {
    showDetailModal,
    setShowDetailModal,
    selectedQuestion,
    setShowAnswerModal,
    setShowForwardModal,
  } = useContext(CounsellorQuestionContext);
  console.log('selectedQuestion._id', selectedQuestion._id);
  const { width } = useWindowDimensions();

  const onForwardClick = () => {
    setShowDetailModal(false);
    setShowForwardModal(true);
  };

  return (
    <ModalLayout
      visible={showDetailModal}
      onClose={() => setShowDetailModal(false)}
      title={'Chi tiết câu hỏi'}
    >
      <AnswerQuestionModal />
      <View style={styles.container}>
        <View style={{ width: '100%' }}>
          <Text style={[styles.text, { fontSize: 18 }, styles.bold]}>
            Câu hỏi:
          </Text>
          <RenderHTML
            source={{ html: selectedQuestion?.content }}
            contentWidth={width}
          />
        </View>
        {selectedQuestion?.fileURL !== null && (
          <View style={{ width: '100%', marginTop: 8 }}>
            <Text style={[styles.text, { fontSize: 18 }, styles.bold]}>
              Đính kèm:
            </Text>
            <File link={selectedQuestion?.fileURL} />
          </View>
        )}
        <View style={{ width: '100%', flexDirection: 'row-reverse', gap: 8 }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.success }]}
            onPress={() => setShowAnswerModal(true)}
          >
            <Text style={[{ color: colors.white }, styles.regular]}>
              Phản hồi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.warning }]}
            onPress={onForwardClick}
          >
            <Text style={[{ color: colors.white }, styles.regular]}>
              Chuyển tiếp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalLayout>
  );
};

const File = ({ link }) => {
  return (
    <View style={styles.fileContainer}>
      <Text
        style={{
          fontSize: 18,
          fontFamily: fonts.BahnschriftRegular,
          color: colors.black75,
        }}
      >
        File
      </Text>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => {
          Linking.openURL(link);
        }}
      >
        <MyIcon
          name={'paperclip'}
          iconPackage="Feather"
          color={colors.black75}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    gap: 8,
    borderWidth: 0.5,
    padding: 16,
    borderRadius: 16,
  },
  fileContainer: {
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: colors.primary20,
    borderColor: colors.black10,
    alignItems: 'center',
  },
  text: {
    color: colors.black75,
  },
  bold: {
    fontFamily: fonts.BahnschriftBold,
  },
  regular: {
    fontFamily: fonts.BahnschriftRegular,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
