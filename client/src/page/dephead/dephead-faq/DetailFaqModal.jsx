import { useContext } from 'react';
import { toast } from 'sonner';
import FileComponent from '../../../atom/file-component';
import MyButton from '../../../atom/my-button';
import ModalLayout2 from '../../../layout/modal-layout-2/ModalLayout2';
import { depheadDeleteFaqSv } from '../../../service/dephead/depheadFaq.sv';
import { DepheadFaqContext } from './DepheadFaqStore';

export const DetailFaqModal = () => {
  const {
    hiddenDetailFaqModal,
    setHiddenDetailFaqModal,
    selected,
    setSelected,
    depheadGetFaqs,
  } = useContext(DepheadFaqContext);

  const deleteFaq = async () => {
    try {
      const response = await depheadDeleteFaqSv(selected._id);
      toast.success(response?.message || 'Xóa FAQ thành công');
      depheadGetFaqs();
      setHiddenDetailFaqModal(true);
      setSelected(null);
    } catch (error) {
      toast.error(error?.message || 'Lỗi khi xóa FAQ');
    }
  };

  return (
    <ModalLayout2
      hidden={hiddenDetailFaqModal}
      setHidden={setHiddenDetailFaqModal}
    >
      <div className="max-w-4xl mx-auto px-6 mb-8 min-w-[40rem]">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Nội dung câu hỏi
          </h2>
          <div className="border-l-4 border-indigo-600 pl-4">
            <p
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: selected?.question,
              }}
            />
            <div className="leading-5 mt-2">
              <p className="text-gray-900 bg-gray-300 inline-block px-1 rounded-lg text-sm ">
                {selected?.field?.fieldName}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Nội dung câu trả lời
          </h2>
          <div className="border-l-4 border-green-600 pl-4">
            <p
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: selected?.answer,
              }}
            />
            {!selected?.answerAttachment ? (
              <></>
            ) : selected.answerAttachment.includes('png') ||
              selected.answerAttachment.includes('jpg') ? (
              <img
                className="size-24"
                src={selected?.answerAttachment}
                alt="image"
              />
            ) : (
              <FileComponent link={selected?.answerAttachment} />
            )}
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <MyButton
            className="bg-primary hover:bg-primary/75"
            onClick={deleteFaq}
          >
            Xóa
          </MyButton>
        </div>
      </div>
    </ModalLayout2>
  );
};
