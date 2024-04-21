import { Mail, Phone, Tag } from "lucide-react";
import { useContext, useMemo } from "react";
import { colors } from "../../../constance";
import ItemLayout from "../../../template/item-layout";
import { getRoleName } from "../../../util/user.util";
import { AdminStaffContext } from "./AdminStaffStore";

export const Item = ({ text, data }) => {
  const { selectedUser, setSelectedUser, updateUser } =
    useContext(AdminStaffContext);

  const cells = useMemo(() => {
    const iconProps = {
      color: colors.black75,
      size: 18,
    };
    return [
      {
        icon: <Phone {...iconProps} />,
        title: "Số điện thoại",
        content: data.phoneNumber || "Chưa cập nhật",
      },
      {
        icon: <Mail {...iconProps} />,
        title: "Email",
        content: data.email || "Chưa cập nhật",
      },
      {
        icon: <Tag {...iconProps} />,
        title: "Chức vụ",
        content: data.role ? getRoleName(data.role) : "Chưa cập nhật",
      },
    ];
  }, [data]);

  const handleExpand = () => {
    const isExpanded = selectedUser === data._id;
    if (isExpanded) setSelectedUser(-1);
    else setSelectedUser(data._id);
  };

  return (
    <ItemLayout
      image={data.avatar}
      isSelected={selectedUser === data._id}
      text={text}
      onExpand={handleExpand}
      status={data.isEnabled}
      onStatus={() => updateUser(data._id, { isEnabled: !data.isEnabled })}
    >
      <div className="flex flex-col gap-2  pl-10 py-4  bg-primary/10 rounded-b-xl">
        {cells.map((cell, index) => {
          return (
            <Cell
              key={cell.title + index}
              icon={cell.icon}
              title={cell.title}
              content={cell.content}
            />
          );
        })}
      </div>
    </ItemLayout>
  );
};

const Cell = ({ icon, title, content }) => {
  return (
    <div className="flex flex-row gap-16">
      <span className="flex flex-row items-center w-40">
        {icon}{" "}
        <p className="text-base ml-1 font-semibold text-black75">{title}</p>
      </span>
      <p className="text-base font-semibold text-black75">{content}</p>
    </div>
  );
};
