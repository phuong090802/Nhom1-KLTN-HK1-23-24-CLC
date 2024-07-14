import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import MyButton from '../../../atom/my-button';
import MyFileInput from '../../../atom/my-file-input';
import MyInput from '../../../atom/my-input';
import MyRichText from '../../../atom/my-rich-text';
import ModalLayout2 from '../../../layout/modal-layout-2';
import { addNewsSv } from '../../../service/admin/adminNews.sv';
import { AdminNewsContext } from './AdminNewsStore';

export const AddNewsModal = () => {
  const { hiddenAddNewsModal, setHiddenAddNewsModal, getNews } =
    useContext(AdminNewsContext);

  const [newsContent, setNewsContent] = useState(EditorState.createEmpty());

  const [newsData, setNewsData] = useState({
    title: '',
    file: null,
  });

  const addNews = async () => {
    try {
      const response = await addNewsSv({
        ...newsData,
        content: draftToHtml(convertToRaw(newsContent.getCurrentContent())),
      });
      console.log('addNews', response);
      toast.success(response?.message || 'Tạo tin tức thành công');
      setNewsContent(EditorState.createEmpty());
      setNewsData({
        title: '',
        file: null,
      });
      getNews();
    } catch (error) {
      toast.error(error?.message || 'Lỗi xảy ra khi tạo tin tức');
    }
  };

  return (
    <ModalLayout2
      hidden={hiddenAddNewsModal}
      setHidden={setHiddenAddNewsModal}
      text={'Thêm tin tức'}
    >
      <div className="mt-2 py-2 w-[28rem]">
        <div className="px-4">
          <MyInput
            className="font-semibold text-black75 rounded-none border-0 border-b-2 px-0"
            placeholder="Tiêu đề tin tức"
            value={newsData.title}
            onChange={(e) =>
              setNewsData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="px-4 mt-2">
          <MyRichText
            editorState={newsContent}
            setEditorState={setNewsContent}
            className={'border-2 h-[150px] px-0'}
            placeholder={'Nhập nội dung câu hỏi ...'}
          />
        </div>
        <div className="pt-2 px-4">
          <MyFileInput
            value={newsData.file}
            onChange={(file) => {
              setNewsData((prev) => ({ ...prev, file: file }));
            }}
          />
        </div>
      </div>
      <div className="p-2">
        <MyButton className="bg-primary" size={'fullWidth'} onClick={addNews}>
          Tạo tin tức
        </MyButton>
      </div>
    </ModalLayout2>
  );
};
