import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { MessageCircleQuestion, MessageCircleReply } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import MyButton from '../../../atom/my-button';
import MyFileInput from '../../../atom/my-file-input';
import MyRichText from '../../../atom/my-rich-text/MyRichText';
import { colors } from '../../../constance';
import { useAuthSocket } from '../../../hooks/useAuthSocket';
import ModalLayout2 from '../../../layout/modal-layout-2';
import { CounsellorQuestionContext } from './CounsellorQuestionStore';

export const AnswerQuestionModal = () => {
  const {
    hiddenAnswerModal,
    setHiddenAnswerModal,
    selectedQuestion,
    getQuestions,
  } = useContext(CounsellorQuestionContext);

  const { authSocket } = useAuthSocket();

  const [submitAnswer, setSubmitAnswer] = useState(EditorState.createEmpty());

  const [isPrivate, setIsPrivate] = useState(false);

  const [file, setFile] = useState(null);

  const handleResponse = async () => {
    if (!isPrivate) normalResponse();
    else privateResponse();
  };

  const normalResponse = async () => {
    const submitFile = file && {
      buffer: file || null,
      size: file ? file.size : null,
      mimetype: file ? file.type : null,
      originalname: file ? file.name : null,
    };

    const responseData = {
      content: draftToHtml(convertToRaw(submitAnswer.getCurrentContent())),
      questionId: selectedQuestion?._id,
      file: submitFile,
    };
    try {
      const response = await authSocket.emitWithAck(
        'answer:create',
        responseData
      );
      toast.success(response.message || 'Phản hồi câu hỏi thành công');
      setSubmitAnswer(EditorState.createEmpty());
      setHiddenAnswerModal(true);
      getQuestions();
    } catch (error) {
      toast.error(error?.message || 'Lỗi khi phản hồi câu hỏi');
    }
  };

  const privateResponse = async () => {
    console.log('private Response');
    const responseData = {
      messageContent: draftToHtml(
        convertToRaw(submitAnswer.getCurrentContent())
      ),
      questionId: selectedQuestion?._id,
    };
    try {
      const response = await authSocket.emitWithAck(
        'conversation:create',
        responseData
      );
      toast.success(response.message || 'Phản hồi câu hỏi thành công');
      setSubmitAnswer(EditorState.createEmpty());
      setHiddenAnswerModal(true);
      getQuestions();
    } catch (error) {
      toast.error(error?.message || 'Lỗi khi phản hồi câu hỏi');
    }
  };

  useEffect(() => {
    setSubmitAnswer(EditorState.createEmpty());
  }, [selectedQuestion]);

  return (
    <ModalLayout2
      setHidden={setHiddenAnswerModal}
      hidden={hiddenAnswerModal}
      text={'Trả lời câu hỏi'}
    >
      <div className="w-96 mt-2">
        <div className="overflow-hidden rounded-xl border mb-2">
          <div className="px-4 py-2 max-h-40 overflow-y-auto flex flex-col gap-2">
            <div className="flex flex-row">
              <MessageCircleQuestion color={colors.black75} />
              <h1 className="font-bold text-black75 ml-2">Câu hỏi</h1>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: selectedQuestion.content || 'Question Not Found',
              }}
            />
            <div className="">
              <p className="text-xs border inline-block px-2 rounded-md bg-light_gray text-black75">
                {selectedQuestion.field || 'unknow field'}
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border mb-2 py-2 px-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex">
                <MessageCircleReply color={colors.black75} />
                <h1 className="font-bold text-black75 ml-2">Phản hồi</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-black75 ml-2 ">Riêng tư:</h1>
                <input
                  autoComplete="off"
                  name="temporaryName"
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
              </div>
            </div>
            <MyRichText
              editorState={submitAnswer}
              className={
                'max-h-96 w-full overflow-y-auto py-0 flex-1 px-0 overflow-auto rounded-none border-none'
              }
              setEditorState={setSubmitAnswer}
              placeholder={'Nhập nội dung phản hồi...'}
            />
            {!isPrivate && <MyFileInput onChange={setFile} value={file} />}
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <MyButton className="bg-primary" size={'md'} onClick={handleResponse}>
            Phản hồi
          </MyButton>
        </div>
      </div>
    </ModalLayout2>
  );
};
