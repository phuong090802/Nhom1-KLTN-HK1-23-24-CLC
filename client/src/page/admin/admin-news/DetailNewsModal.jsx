import clsx from 'clsx';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { File } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import MyButton from '../../../atom/my-button';
import MyFileInput from '../../../atom/my-file-input';
import MyInput from '../../../atom/my-input';
import MyRichText from '../../../atom/my-rich-text';
import { colors } from '../../../constance';
import ModalLayout2 from '../../../layout/modal-layout-2';
import {
  deleteNewsSv,
  updateNewsSv,
} from '../../../service/admin/adminNews.sv';
import { DataContext } from '../../../store';
import { AdminNewsContext } from './AdminNewsStore';

export const DetailNewsModal = () => {
  const {
    hiddenDetailNewsModal,
    setHiddenDetailNewsModal,
    selectedNews,
    getNews,
  } = useContext(AdminNewsContext);

  const [newsContent, setNewsContent] = useState(EditorState.createEmpty());

  const [isEditing, setIsEditing] = useState(false);

  const [newsData, setNewsData] = useState({
    title: '',
    file: null,
  });

  const updateNews = async () => {
    try {
      const response = await updateNewsSv(selectedNews._id, {
        ...newsData,
        content: draftToHtml(convertToRaw(newsContent.getCurrentContent())),
      });
      setHiddenDetailNewsModal(true);
      toast.success(response?.message || 'Cập nhật tin tức thành công');
      getNews();
      setIsEditing(false);
    } catch (error) {
      toast.error(error?.message || 'Lỗi xảy ra khi cập nhật tin tức');
    }
  };

  const deleteNews = async () => {
    try {
      const response = await deleteNewsSv(selectedNews._id);
      toast.success(response?.message || 'Xóa tin tức thành công');
      setHiddenDetailNewsModal(true);
      getNews();
    } catch (error) {
      toast.error(error?.message || 'Lỗi khi xóa tin tức');
    }
  };

  useEffect(() => {
    if (!selectedNews) return;
    setNewsData({
      title: selectedNews?.title || '',
      file: selectedNews?.file || null,
    });
    const blocksFromHtml = htmlToDraft(selectedNews?.content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    setNewsContent(EditorState.createWithContent(contentState));
  }, [selectedNews]);

  return (
    <ModalLayout2
      hidden={hiddenDetailNewsModal}
      setHidden={setHiddenDetailNewsModal}
      text={'Chi tiết'}
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
            disabled={!isEditing}
          />
        </div>
        <div className="px-4 mt-2">
          <MyRichText
            editorState={newsContent}
            setEditorState={setNewsContent}
            className={'border-2 h-[150px] px-0'}
            placeholder={'Nhập nội dung câu hỏi ...'}
            disable={!isEditing}
          />
        </div>
        <div className="pt-2 px-4">
          {isEditing ? (
            <MyFileInput
              value={newsData.file}
              onChange={(file) => {
                setNewsData((prev) => ({ ...prev, file: file }));
              }}
              accept="image/png, image/gif, image/jpeg"
            />
          ) : (
            !!selectedNews?.file && <FileComponent link={selectedNews?.file} />
          )}
        </div>
      </div>
      <div className="p-2 flex flex-row-reverse gap-1">
        {isEditing ? (
          <>
            <MyButton
              className="bg-error hover:bg-error/75"
              size={'md'}
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Hủy
            </MyButton>
            <MyButton
              className="bg-success hover:bg-success/75"
              size={'md'}
              onClick={updateNews}
            >
              Cập nhật
            </MyButton>
          </>
        ) : (
          <>
            <MyButton
              className="bg-error hover:bg-error/75"
              size={'md'}
              onClick={deleteNews}
            >
              Xóa
            </MyButton>
            <MyButton
              className="bg-primary hover:bg-primary/75"
              size={'md'}
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Chỉnh sửa
            </MyButton>
          </>
        )}
      </div>
    </ModalLayout2>
  );
};

const FileComponent = ({ link }) => {
  const { darkMode } = useContext(DataContext);

  return (
    <a
      className={clsx(
        'border px-2 py-1 flex items-center bg-primary/10 gap-2 rounded-lg max-w-44'
      )}
      href={link}
      target="_blank"
    >
      <File className="" color={darkMode ? '#fff' : colors.black75} />
      <p className={clsx(darkMode ? 'text-white' : 'text-black75')}>
        Tệp đính kèm
      </p>
    </a>
  );
};
