import { useContext } from 'react';
import FileComponent from '../../../atom/file-component/FileComponent';
import ModalLayout2 from '../../../layout/modal-layout-2';
import { convertDateTimeToDate } from '../../../util/convert.util';
import { NewsPageContext } from './NewsPageStore';

export const DetailNewsModal = () => {
  const { hiddenDetailNewsModal, setHiddenDetailNewsModal, selectedNews } =
    useContext(NewsPageContext);

  console.log(selectedNews);

  return (
    <ModalLayout2
      hidden={hiddenDetailNewsModal}
      setHidden={setHiddenDetailNewsModal}
    >
      <div className=" flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
          <h1 className="text-3xl font-bold mb-4">{selectedNews?.title}</h1>
          <p className="text-gray-600 mb-4">
            Thời gian đăng: {convertDateTimeToDate(selectedNews?.createdAt)}
          </p>
          <div className="mb-4">
            {selectedNews?.file &&
              (selectedNews.file.includes('png') ||
                selectedNews.file.includes('jpg')) && (
                <img
                  src={selectedNews.file}
                  alt="News"
                  className="w-full h-auto rounded-lg"
                />
              )}
          </div>
          <div
            className="text-gray-800"
            dangerouslySetInnerHTML={{ __html: selectedNews?.content }}
          />
          {selectedNews?.file &&
            !selectedNews.file.includes('png') &&
            !selectedNews.file.includes('jpg') && (
              <div className="mt-2">
                <FileComponent link={selectedNews?.file} />
              </div>
            )}
        </div>
      </div>
    </ModalLayout2>
  );
};
