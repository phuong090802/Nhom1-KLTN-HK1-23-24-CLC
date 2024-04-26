import { useContext, useMemo } from "react";
import ItemLayout from "../../../template/item-layout";
import { getRoleName } from "../../../util/user.util";
import {
  Mail,
  Phone,
  Tag,
  Layers,
  CircleMinus,
  CirclePlus,
} from "lucide-react";
import { colors } from "../../../constance";
import { DepheadCounsellorContext } from "./DepheadCounsellorStore";
import MyButton from "../../../atom/my-button";

export const Item = ({ data }) => {
  const { selected, setSelected, depheadUpdateCounsellorStatus } = useContext(
    DepheadCounsellorContext
  );

  const handleExpand = () => {
    const isExpanded = selected === data._id;
    if (isExpanded) setSelected(-1);
    else setSelected(data._id);
  };

  const cells = useMemo(() => {
    const iconProps = {
      color: colors.black75,
      size: 18,
    };
    return [
      {
        icon: <Phone {...iconProps} />,
        title: "Số điện thoại:",
        content: data.phoneNumber || "Chưa cập nhật",
      },
      {
        icon: <Mail {...iconProps} />,
        title: "Email:",
        content: data.email || "Chưa cập nhật",
      },
      {
        icon: <Tag {...iconProps} />,
        title: "Chức vụ:",
        content: data.role ? getRoleName(data.role) : "Chưa cập nhật",
      },
      {
        icon: <Layers {...iconProps} />,
        title: "Lĩnh vực:",
        content: (
          <>
            <div>
              {data.fields.map((field) => {
                return (
                  <p key={field._id} className="inline-flex">
                    {field.fieldName}{" "}
                    <CircleMinus
                      className="inline-block mx-1 bg-error rounded-full cursor-pointer"
                      size={20}
                      color="#fff"
                    />
                    ,
                  </p>
                );
              })}
              <MyButton size={"sm"} className="bg-primary hover:bg-primary/75">
                <CirclePlus
                  className="mx-1 rounded-full cursor-pointer"
                  size={16}
                  color="#fff"
                />
              </MyButton>
            </div>
          </>
        ),
      },
    ];
  }, [data]);

  return (
    <ItemLayout
      image={data.avatar}
      text={data.fullName}
      isSelected={selected === data._id}
      status={data.isEnabled}
      onExpand={handleExpand}
      onStatus={() =>
        depheadUpdateCounsellorStatus(data._id, { isEnabled: !data.isEnabled })
      }
    >
      <div className="flex flex-col gap-2  pl-10 py-4  bg-primary/10 rounded-b-xl">
        {cells &&
          cells.map((cell, index) => (
            <Cell
              key={cell.title + index}
              icon={cell.icon}
              title={cell.title}
              content={cell.content}
            />
          ))}
      </div>
    </ItemLayout>
  );
};

const Cell = ({ icon, title, content }) => {
  return (
    <div className="flex flex-row gap-16">
      <span className="flex flex-row items-center w-40 self-start">
        {icon}{" "}
        <p className="text-base ml-1 font-semibold text-black75 ">{title}</p>
      </span>
      <div className="text-base font-semibold text-black75">{content}</div>
    </div>
  );
};
