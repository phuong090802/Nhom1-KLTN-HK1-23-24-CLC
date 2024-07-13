import Checkbox from 'expo-checkbox';
import { getDocumentAsync } from 'expo-document-picker';
import { createRef, useContext, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, fonts } from '../../../../constance';
import MyIcon from '../../../component/atomic/my-icon';
import MyRichText from '../../../component/atomic/my-rich-text/MyRichText';
import { useAuthSocket } from '../../../hooks/useAuthSocket';
import { AppContext } from '../../AppProvider';
import { CounsellorQuestionContext } from './CounsellorQuestionProvider';

export const AnswerQuestionModal = () => {
  const { showAnswerModal, setShowAnswerModal, selectedQuestion } = useContext(
    CounsellorQuestionContext
  );
  const { authSocket } = useAuthSocket();
  const initAnswerData = {
    questionId: '',
    content: '',
    isApprovalRequest: false,
  };
  const { user } = useContext(AppContext);
  const [answerData, setAnswerData] = useState(initAnswerData);
  const [file, setFile] = useState(null);

  const answerQuestion = async () => {
    if (!authSocket) return;
    console.log('answerQuestion');
    const submitFile = file && {
      buffer: file || null,
      size: file ? file.size : null,
      mimetype: file ? file.type : null,
      originalname: file ? file.name : null,
    };
    try {
      // console.log({
      //   ...answerData,
      //   questionId: selectedQuestion._id,
      //   file: submitFile,
      // });
      const response = await authSocket.emitWithAck('answer:create', {
        ...answerData,
        questionId: selectedQuestion._id,
        file: submitFile,
      });
      ToastAndroid.show(
        response.message || 'Phản hôi câu hỏi thành công',
        ToastAndroid.SHORT
      );
      console.log('answerQuestion', response);
    } catch (error) {
      console.log('answerQuestion', error);
    }
  };

  const onHtmlChange = (html) => {
    setAnswerData((prev) => ({ ...prev, content: html.html }));
  };

  const _editor = createRef();

  const onFilePicker = async () => {
    if (!file) {
      const file = await getDocumentAsync();
      // console.log(file.assets[0]);
      setFile(file.assets[0]);
    } else {
      setFile(null);
    }
  };

  return (
    <Modal visible={showAnswerModal} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              paddingBottom: 8,
              paddingHorizontal: 16,
            }}
          >
            <View></View>
            <Text style={styles.title}>Phản hồi</Text>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => setShowAnswerModal(false)}
            >
              <MyIcon
                iconPackage="Fontisto"
                name={'close'}
                size={32}
                color={colors.black75}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.richTextContainer}>
            <MyRichText editorRef={_editor} setValue={onHtmlChange} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderTopWidth: 0.2,
              }}
            >
              <Text numberOfLines={1} style={styles.fileNameText}>
                {file?.name || 'Chọn File'}
              </Text>
              <TouchableOpacity
                style={styles.fileButton}
                onPress={onFilePicker}
              >
                <MyIcon
                  iconPackage="MaterialIcons"
                  name={!!file ? 'delete-outline' : 'attach-file'}
                  color={colors.primary}
                  size={32}
                />
              </TouchableOpacity>
            </View>
          </View>

          {user.role === 'COUNSELLOR' && (
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                gap: 8,
                padding: 8,
              }}
            >
              <Checkbox
                value={answerData.isApprovalRequest}
                onValueChange={(value) =>
                  setAnswerData((prev) => ({
                    ...prev,
                    isApprovalRequest: value,
                  }))
                }
              />
              <Text style={styles.text}>Duyệt:</Text>
            </View>
          )}

          <View
            style={{
              width: '100%',
              flexDirection: 'row-reverse',
              gap: 8,
              padding: 8,
            }}
          >
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.success }]}
              onPress={answerQuestion}
            >
              <Text style={[{ color: colors.white }, styles.regular]}>
                Phản hồi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  richTextContainer: {
    paddingVertical: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginTop: 8,
    marginHorizontal: 8,
    // backgroundColor: colors.primary
  },
  fileButton: {
    // backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  fileNameText: {
    textAlignVertical: 'center',
    fontFamily: fonts.BahnschriftRegular,
    fontSize: 16,
    paddingHorizontal: 8,
    maxWidth: '80%',
  },
  content: {
    backgroundColor: colors.white,
    paddingTop: 16,
    borderRadius: 8,
    width: '80%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontFamily: fonts.BahnschriftBold,
    fontSize: 22,
    color: colors.black75,
  },
  option: {
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.BahnschriftRegular,
    fontSize: 18,
    color: colors.black75,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
