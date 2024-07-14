import { MessageCircleReply } from 'lucide-react';
import { useContext } from 'react';
import { colors } from '../../../constance';
import ItemLayout from '../../../layout/item-layout';
import { FaqsPageContext } from './FaqsPageStore';

export const Item = ({ data }) => {
  const { selected, setSelected } = useContext(FaqsPageContext);

  const handleExpand = () => {
    console.log('handleExpand', data._id);
    if (selected === data._id) setSelected('');
    else setSelected(data._id);
  };
  return (
    <ItemLayout
      text={data.question}
      infor={[data?.department, data?.field]}
      onExpand={handleExpand}
      isSelected={data._id === selected}
    >
      <div className="flex flex-row gap-2 px-4 py-2 mt-2 rounded-xl border-2">
        <div>
          <MessageCircleReply color={colors.black75} />
        </div>
        <div>
          <h1 className="font-bold text-black75">Phản hồi</h1>
          <p dangerouslySetInnerHTML={{ __html: data?.answer }}></p>
        </div>
      </div>
    </ItemLayout>
  );
};
