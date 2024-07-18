import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Type } from 'lucide-react';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import MyButton from '../../../atom/my-button/MyButton';
import MyFileInput from '../../../atom/my-file-input';
import MyInput from '../../../atom/my-input';
import MyRichText from '../../../atom/my-rich-text/MyRichText';
import MySelect from '../../../atom/my-select';
import { colors } from '../../../constance';
import { depheadCreateFaqSv } from '../../../service/dephead/depheadFaq.sv';
import { AddFaqModalContext } from './AddFaqModal';
import { DepheadFaqContext } from './DepheadFaqStore';
import { initFaqData } from './constance';

export const AddFaqForm = () => {
  const { fieldData } = useContext(AddFaqModalContext);
  const { depheadGetFaqs } = useContext(DepheadFaqContext);

  const [submitData, setSubmitData] = useState(initFaqData);
  const [submitAnswer, setSubmitAnswer] = useState(EditorState.createEmpty());

  const handleSubmit = async () => {
    // console.log(draftToHtml(convertToRaw(submitAnswer.getCurrentContent())));
    const formData = new FormData();
    for (let key in submitData) {
      formData.append(key, submitData[key]);
    }
    formData.append(
      'answer',
      draftToHtml(convertToRaw(submitAnswer.getCurrentContent()))
    );
    try {
      const reponse = await depheadCreateFaqSv(formData);
      toast.success(reponse.message || 'Tạo câu hỏi chung thành công');
      depheadGetFaqs();
      setSubmitData(initFaqData);
      setSubmitAnswer(EditorState.createEmpty());
    } catch (error) {
      toast.error(error?.message || 'Có lỗi xảy ra khi tạo câu');
    }
  };

  // Handle SubmitData Change
  const handleFieldSelect = (value) => {
    setSubmitData((prev) => ({ ...prev, fieldId: value }));
  };

  const handleQuestionChange = (value) => {
    setSubmitData((prev) => ({ ...prev, question: value }));
  };

  const handleAnswerChange = (value) => {
    setSubmitData((prev) => ({ ...prev, answer: value }));
  };

  const handleFileChange = (files) => {
    setSubmitData((prev) => ({ ...prev, file: files }));
  };

  return (
    <div className="mt-4">
      <div className="w-80 gap-2 flex flex-col">
        <MySelect
          name="field"
          className="w-full border-black10 border-2 "
          boxHeight={40}
          placeholder="Chọn lĩnh vực"
          data={fieldData}
          value={submitData.fieldId}
          onChange={handleFieldSelect}
        />
        <MyInput
          variant={'icon'}
          placeholder="Câu hỏi"
          inputHeight={40}
          value={submitData.question}
          onChange={(e) => handleQuestionChange(e.target.value)}
          icon={<Type size={24} color={colors.black50} />}
          className=""
        />
        <MyRichText
          editorState={submitAnswer}
          setEditorState={setSubmitAnswer}
          className={'border-2 h-[150px] px-0'}
        />
        <MyFileInput onChange={handleFileChange} value={submitData.file} />
      </div>
      <div className="mt-2 flex flex-row-reverse">
        <MyButton className="bg-primary" onClick={handleSubmit}>
          Thêm
        </MyButton>
      </div>
    </div>
  );
};
