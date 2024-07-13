import { BriefcaseBusiness, Building2, Mail, Phone } from "lucide-react";
import { useContext, useMemo } from "react";
import default_avatar from "../../../assets/image/default_avatar.png";
import ItemLayout from "../../../layout/item-layout";
import { CounsellorPageContext } from "./CounsellorPageStore";
import { getRoleName } from "../../../util/user.util";
export const Item = ({ data }) => {
  const { selected, setSelected } = useContext(CounsellorPageContext);

  const itemComponent = useMemo(() => {
    const handleExpand = () => {
      if (selected === data._id) setSelected("");
      else setSelected(data._id);
    };

    const contentComponent = (
      <div className="flex flex-col gap-2 mt-2 px-12">
        <div className="grid grid-cols-3">
          <div className="flex items-center gap-1 ">
            <Phone size={16} />
            <p>Số điện thoại:</p>
          </div>
          <p className="flex items-center gap-1 col-span-2 ">
            {data.phoneNumber || "Chưa cập nhật"}
          </p>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex items-center gap-1 ">
            <Mail size={16} />
            <p>Email:</p>
          </div>
          <p className="flex items-center gap-1 col-span-2 ">
            {data.email || "Chưa cập nhật"}
          </p>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex items-center gap-1 ">
            <Building2 size={16} />
            <p>Đơn vị:</p>
          </div>
          <p className="flex items-center gap-1 col-span-2 ">
            {data.department || "Chưa cập nhật"}
          </p>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex items-center gap-1 ">
            <BriefcaseBusiness size={16} />
            <p>Chức vụ:</p>
          </div>
          <p className="flex items-center gap-1 col-span-2 ">
            {getRoleName(data.role)}
          </p>
        </div>
      </div>
    );

    return (
      <ItemLayout
        text={data.fullName}
        infor={[data?.department]}
        image={data.avatar || default_avatar}
        onExpand={handleExpand}
        isSelected={selected === data._id}
      >
        {contentComponent}
      </ItemLayout>
    );
  }, [data, selected]);

  return itemComponent;
};
