import { MessageCircleReply } from "lucide-react";
import { useContext } from "react";
import { colors } from "../../../constance";
import ItemLayout from "../../../layout/item-layout";
import { FaqsPageContext } from "./FaqsPageStore";
import FileComponent from "../../../atom/file-component";

export const Item = ({ data }) => {
  const { selected, setSelected } = useContext(FaqsPageContext);

  const handleExpand = () => {
    console.log("handleExpand", data._id);
    if (selected === data._id) setSelected("");
    else setSelected(data._id);
  };

  console.log(data);
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
          <p dangerouslySetInnerHTML={{ __html: data?.answer }} />
          {data?.answerAttachment &&
            (data.answerAttachment.includes("png") ||
              data.answerAttachment.includes("jpg")) && (
              <img
                src={data.answerAttachment}
                alt="News"
                className="w-full h-auto rounded-lg"
              />
            )}
          {data?.answerAttachment &&
            !data.answerAttachment.includes("png") &&
            !data.answerAttachment.includes("jpg") && (
              <div className="mt-2">
                <FileComponent link={data?.answerAttachment} />
              </div>
            )}
        </div>
      </div>
    </ItemLayout>
  );
};
