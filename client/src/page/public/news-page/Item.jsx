import { Calendar, MessageCircleReply, Paperclip } from 'lucide-react';
import { useContext } from 'react';
import { colors } from '../../../constance';
import ItemLayout from '../../../layout/item-layout';
import { DataContext } from '../../../store';
import { convertDateTimeToDate } from '../../../util/convert.util';
import { NewsPageContext } from './NewsPageStore';

export const Item = ({ data }) => {
  const { selected, setSelected } = useContext(NewsPageContext);

  const { darkMode } = useContext(DataContext);

  const handleExpand = () => {
    if (selected === data._id) setSelected('');
    else setSelected(data._id);
  };
  return (
    <ItemLayout
      text={data.title || 'Tiêu đề '}
      isSelected={selected === data._id}
      onExpand={handleExpand}
      extraInforComponent={
        <div className="flex items-center gap-1">
          <Calendar size={20} color={darkMode ? '#fff' : colors.black75} />
          <p className="text-sm">
            {data?.createdAt
              ? convertDateTimeToDate(data.createdAt)
              : 'createdAt'}
          </p>
        </div>
      }
    >
      <div className="flex flex-row gap-2 px-4 py-2 mt-2 rounded-xl border-2">
        <MessageCircleReply color={colors.black75} />
        <div>
          <h1 className="font-bold text-black75">Phản hồi</h1>
          <p>{data?.content}</p>
          {!!data.file &&
            (data?.file?.includes('.png') ? (
              <img
                src={data.file}
                alt=""
                className="w-40 mt-2 border rounded-xl border-black"
              />
            ) : (
              <a
                href={data.file}
                className="flex items-center border px-2 py-1 w-fit rounded-xl gap-2 cursor-pointer hover:bg-primary/10 mt-2"
                target="_blank"
              >
                <Paperclip size={16} />
                <p>File đính kèm</p>
              </a>
            ))}
        </div>
      </div>
    </ItemLayout>
  );
};

const file = () => {
  return <div></div>;
};
