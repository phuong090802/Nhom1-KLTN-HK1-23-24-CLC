import clsx from 'clsx';
import { File, MessageCircleQuestion } from 'lucide-react';
import { useContext } from 'react';
import MyButton from '../../../atom/my-button';
import { colors } from '../../../constance';
import ItemLayout from '../../../layout/item-layout';
import { DataContext } from '../../../store';
import { DepheadFaqContext } from './DepheadFaqStore';

export const Item = ({ data }) => {
  const { selected, setSelected } = useContext(DepheadFaqContext);

  const { darkMode } = useContext(DataContext);

  const handleExpand = () => {
    if (selected === data._id) setSelected(-1);
    else setSelected(data._id);
  };
  return (
    <ItemLayout
      text={data.question}
      infor={[data.field.fieldName || 'unknow field']}
      isSelected={selected === data._id}
      onExpand={handleExpand}
    >
      <div className="flex flex-row gap-2 px-4 py-2 mt-2 rounded-xl border-2">
        <MessageCircleQuestion color={darkMode ? '#fff' : colors.black75} />
        <div>
          <h1 className="font-bold">Câu hỏi</h1>
          <div
            className="mb-2"
            dangerouslySetInnerHTML={{ __html: data.answer }}
          />
          {data?.answerAttachment && (
            <FileComponent link={data.answerAttachment || null} />
          )}
        </div>
      </div>
      <div className="mt-2 flex flex-row-reverse">
        <MyButton className="bg-error font-semibold">Xóa</MyButton>
      </div>
    </ItemLayout>
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
