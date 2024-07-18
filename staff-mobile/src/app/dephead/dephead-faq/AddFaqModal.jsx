import { getDocumentAsync } from 'expo-document-picker';
import { createRef, useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, fonts } from '../../../../constance';
import MyButton from '../../../component/atomic/my-button';
import MyIcon from '../../../component/atomic/my-icon';
import MyRichText from '../../../component/atomic/my-rich-text';
import MySelect from '../../../component/atomic/my-select';
import ModalLayout from '../../../component/molecule/modal-layout';
import { depheadAddFaqSv } from '../../../service/dephead/depheadFaq.sv';
import { DepheadFaqContext } from './DepheadFaqProvider';

export const AddFaqModal = () => {
  const { showAddFaqModal, setShowAddFaqModal, filterData } =
    useContext(DepheadFaqContext);

  const initFaqData = {
    fieldId: '',
    question: '',
    answer: '',
    file: null,
  };

  const [faqData, setFaqData] = useState(initFaqData);

  const onHtmlChange = (html) => {
    setFaqData((prev) => ({ ...prev, answer: html.html }));
  };

  const handleQuestionChange = (value) => {
    setFaqData((prev) => ({ ...prev, question: value }));
  };

  const _editor = createRef();

  const onFilePicker = async () => {
    if (!faqData?.file) {
      const file = await getDocumentAsync();
      // console.log(file.assets[0]);
      setFaqData((prev) => ({ ...prev, file: file.assets[0] }));
    } else {
      setFaqData((prev) => ({ ...prev, file: null }));
    }
  };

  const AddFaq = async () => {
    console.log(faqData);
    if (!faqData.question) {
      alert('Chưa nhập câu hỏi!!');
      return;
    }
    if (!faqData.answer) {
      alert('Chưa nhập nội dung!!');
      return;
    }
    if (!faqData.fieldId) {
      alert('Chưa chọn lĩnh vực');
      return;
    }
    try {
      const response = await depheadAddFaqSv(faqData);
      // console.log(response);
      alert(response?.message || 'Thêm tin tức thành công');
      setFaqData(initFaqData);
      alert(response?.message || 'Thêm tin tức thành công');
      // _editor.current.setContents([{ insert: '' }]);
      setShowAddFaqModal(false)
    } catch (error) {
      console.log('AddFaq', error);
      alert(error?.message || 'Lỗi khi thêm tin tức');
    }
  };

  return (
    <ModalLayout
      visible={showAddFaqModal}
      onClose={() => setShowAddFaqModal(false)}
      title={'Thêm Faq'}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Câu hỏi</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={faqData.question}
          onChangeText={handleQuestionChange}
        />
        <Text style={styles.label}>Chọn lĩnh vực</Text>
        <MySelect
          data={filterData[0]?.data}
          onSelect={(data) =>
            setFaqData((prev) => ({ ...prev, fieldId: data.value }))
          }
        />
        <Text style={[styles.label, { marginBottom: 2 }]}>Nội dung</Text>
        <View style={styles.richTextContainer}>
          <MyRichText setValue={onHtmlChange} editorRef={_editor} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderTopWidth: 0.2,
            }}
          >
            <Text numberOfLines={1} style={styles.fileNameText}>
              {faqData?.file?.name || 'Chọn File'}
            </Text>
            <TouchableOpacity style={styles.button} onPress={onFilePicker}>
              <MyIcon
                iconPackage="MaterialIcons"
                name={!!faqData?.file?.name ? 'delete-outline' : 'attach-file'}
                color={colors.primary}
                size={32}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <MyButton style={{ marginTop: 8 }} onPress={AddFaq} buttonText={"Thêm"}/>
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  label: {
    fontFamily: fonts.BahnschriftBold,
    fontSize: 16,
  },
  textInput: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 18,
    fontFamily: fonts.BahnschriftRegular,
    marginBottom: 8,
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
  },
  button: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 6,
    paddingHorizontal: 6,
    alignSelf: 'flex-end',
    borderRadius: 8,
    marginTop: 8,
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
});
