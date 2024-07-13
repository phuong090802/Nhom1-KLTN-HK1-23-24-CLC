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
import ModalLayout from '../../../component/molecule/modal-layout';
import { addNewsSv } from '../../../service/admin/adminNews.sv';
import { AdminNewsContext } from './AdminNewsProvider';

export const AddNewsModal = () => {
  const { setShowAddNewsModal, showAddNewsModal } =
    useContext(AdminNewsContext);

  const initNewsData = {
    title: '',
    file: null,
    content: '',
  };

  const [newsData, setNewsData] = useState(initNewsData);

  const onHtmlChange = (html) => {
    setNewsData((prev) => ({ ...prev, content: html.html }));
  };

  const onFilePicker = async () => {
    if (!newsData?.file) {
      const file = await getDocumentAsync();
      console.log('onFilePicker', file.assets[0]);
      setNewsData((prev) => ({ ...prev, file: file.assets[0] }));
    } else {
      setNewsData((prev) => ({ ...prev, file: null }));
    }
  };

  const handleTitleChange = (value) => {
    setNewsData((prev) => ({ ...prev, title: value }));
  };

  const AddNews = async () => {
    if (!newsData.title) {
      alert('Chưa nhập tiêu đề!!');
      return;
    }
    if (!newsData.content) {
      alert('Chưa nhập nội dung!!');
      return;
    }
    try {
      const response = await addNewsSv(newsData);
      console.log('AddNews', response);
      alert(response?.message || 'Thêm tin tức thành công');
      setNewsData(initNewsData);
    } catch (error) {
      console.log('AddNews', error);
      alert(error?.message || 'Lỗi khi thêm tin tức');
    }
  };

  const modalOnClose = () => {
    setShowAddNewsModal(false);
    setNewsData(initNewsData);
  };

  const _editor = createRef();

  return (
    <ModalLayout
      visible={showAddNewsModal}
      onClose={modalOnClose}
      title={'Thêm tin tức'}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Tiêu đề</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={newsData.title}
          onChangeText={handleTitleChange}
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
              {newsData?.file?.name || 'Chọn File'}
            </Text>
            <TouchableOpacity style={styles.button} onPress={onFilePicker}>
              <MyIcon
                iconPackage="MaterialIcons"
                name={!!newsData?.file?.name ? 'delete-outline' : 'attach-file'}
                color={colors.primary}
                size={32}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <MyButton style={{ marginTop: 8 }} onPress={AddNews} />
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 16 },
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
    shadowOffset: { width: 0, height: 2 },
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
