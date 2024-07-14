import { useContext } from 'react';
import default_avatar from '../../../assets/image/default_avatar.png';
import FileComponent from '../../../atom/file-component';
import MyButton from '../../../atom/my-button';
import ModalLayout2 from '../../../layout/modal-layout-2';
import { DepheadAnswerContext } from './DepheadAnswerStore';
import { FeedbackModal } from './FeedbackModal';

export const DetailAnswerModal = () => {
  const {
    hiddenDetailAnswerModal,
    setHiddenDetailAnswerModal,
    selected,
    ApproveAnswer,
    setHiddenFeedback,
  } = useContext(DepheadAnswerContext);

  return (
    <ModalLayout2
      hidden={hiddenDetailAnswerModal}
      setHidden={setHiddenDetailAnswerModal}
    >
      <FeedbackModal />
      <div className="max-w-4xl mx-auto px-6 mb-8 min-w-[40rem]">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-indigo-600 mb-4">
            {selected?.title}
          </h1>
          <h2 className="text-xl font-semibold text-gray-800">
            Nội dung câu hỏi
          </h2>
          <div className="border-l-4 border-indigo-600 pl-4">
            <p
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: selected?.content,
              }}
            />
            <div className="mt-2">
              {!selected?.fileURL ? (
                <></>
              ) : selected.fileURL.includes('png') ||
                selected.fileURL.includes('jpg') ? (
                <img className="size-24" src={selected?.fileURL} alt="image" />
              ) : (
                <FileComponent link={selected?.fileURL} />
              )}
            </div>
            <div className="mt-4 flex items-center">
              <img
                className="size-8 rounded-full mr-2"
                src={selected?.user?.avatar || default_avatar}
                alt="Avatar tác giả"
              />
              <p className="text-sm text-gray-500">
                Tác giả:{' '}
                <span className="font-medium text-gray-800">
                  {selected?.user?.fullName}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Nội dung phản hồi
          </h2>
          <div className="border-l-4 border-green-600 pl-4 mt-4">
            <p
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: selected?.answer?.content,
              }}
            />
            <div className="mt-2">
              {!selected?.answer?.fileURL ? (
                <></>
              ) : selected.answer.fileURL.includes('png') ||
                selected.answer.fileURL.includes('jpg') ? (
                <img
                  className="size-24"
                  src={selected?.answer?.fileURL}
                  alt="image"
                />
              ) : (
                <FileComponent link={selected?.answer?.fileURL} />
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Được trả lời bởi:{' '}
              <span className="font-medium text-gray-800">
                {selected?.user?.fullName}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-row-reverse mt-2 gap-2">
          <MyButton
            className="bg-success hover:opacity-75"
            size={'md'}
            onClick={() => ApproveAnswer(selected._id)}
          >
            Duyệt
          </MyButton>
          <MyButton
            className="bg-error hover:opacity-75"
            size={'md'}
            onClick={() => setHiddenFeedback(false)}
          >
            Từ chối
          </MyButton>
        </div>
      </div>
    </ModalLayout2>
  );
};
