import default_avatar from "../../../assets/image/default_avatar.png";
import { ArrowUpFromLine } from "lucide-react";

export const StaffInfoBox = ({ data, chooseDephead }) => {
  return (
    <div className="py-2 px-4 border rounded-2xl flex items-center font-semibold justify-between">
      <div className="flex items-center  gap-2">
        <img
          src={data?.avatar || default_avatar}
          alt="user-avatar"
          className="w-10 h-10 border border-primary rounded-lg"
        />
        {data?.fullName || "Tên nhân viên"}
      </div>
      <ArrowUpFromLine
        className="text-primary cursor-pointer"
        onClick={() => chooseDephead(data._id)}
      />
    </div>
  );
};
