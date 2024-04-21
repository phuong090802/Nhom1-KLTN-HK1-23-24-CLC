import React, { useContext } from "react";
import ItemLayout from "../../../template/item-layout";
import { DepheadFaqContext } from "./DepheadFaqStore";
import { MessageCircleQuestion } from "lucide-react";
import { colors } from "../../../constance";
import MyButton from "../../../atom/my-button";

export const Item = ({ data }) => {
  const { selected, setSelected } = useContext(DepheadFaqContext);

  const handleExpand = () => {
    if (selected === data._id) setSelected(-1);
    else setSelected(data._id);
  };
  return (
    <ItemLayout
      text={data.question}
      infor={[data.field.fieldName || "unknow field"]}
      isSelected={selected === data._id}
      onExpand={handleExpand}
    >
      <div className="flex flex-row gap-2 px-4 py-2 mt-2 rounded-xl border-2">
        <MessageCircleQuestion color={colors.black75} />
        <div>
          <h1 className="font-bold text-black75">Câu hỏi</h1>
          <div className="" dangerouslySetInnerHTML={{ __html: data.answer }} />
        </div>
      </div>
      <div className="mt-2 flex flex-row-reverse">
        <MyButton className="bg-error font-semibold">Xóa</MyButton>
      </div>
    </ItemLayout>
  );
};
