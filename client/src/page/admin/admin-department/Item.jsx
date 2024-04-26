import { Users } from "lucide-react";
import default_avatar from "../../../assets/image/default_avatar.png";
import Search from "../../../atom/search/Search";
import {
  chooseDepheadSv,
  getDepCounsellorsSv,
} from "../../../service/admin/adminDepartment.sv";
import ItemLayout from "../../../template/item-layout";
import { StaffInfoBox } from "./StaffInfoBox";
import { useEffect, useState } from "react";
import Pagination from "../../../molecule/pagination";

export const Item = ({
  isSelected,
  setSelected,
  data,
  status,
  onStatus,
  onEdit,
}) => {
  const handleExpand = () => {
    if (isSelected) setSelected(-1);
    else setSelected(data._id);
  };

  const initParams = {
    search: ["fullName"],
    keyword: "",
    page: 1,
    size: 6,
    filter: {
      role: "COUNSELLOR",
    },
    sort: {
      fullName: 1,
    },
  };

  const [params, setParams] = useState(initParams);

  const [counsellors, setCounsellors] = useState([]);

  const [dephead, setDephead] = useState(null);

  const [pages, setPages] = useState(0);

  const getDephead = async () => {
    try {
      const response = await getDepCounsellorsSv(data._id, {
        filter: {
          role: "DEPARTMENT_HEAD",
        },
      });
      setDephead(response.counsellors[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getDepCounsellors = async () => {
    try {
      const response = await getDepCounsellorsSv(data._id, params);
      setCounsellors(response.counsellors);
      setPages(response.pages);
    } catch (error) {
      console.log(error);
    }
  };

  const chooseDephead = async (userId) => {
    try {
      const submitData = { departmentId: data._id, userId: userId };
      const response = await chooseDepheadSv(submitData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDepCounsellors();
  }, [params]);

  useEffect(() => {
    getDephead();
  }, []);

  return (
    <ItemLayout
      text={data.departmentName}
      isSelected={isSelected}
      onExpand={handleExpand}
      status={status}
      onStatus={onStatus}
      onEdit={onEdit}
    >
      <div className="mt-2">
        <div className="flex gap-2">
          <img
            src={dephead?.avatar || default_avatar}
            alt=""
            className="w-12 h12 border-2 border-primary rounded-2xl "
          />
          <div>
            <h1 className="font-bold">
              {dephead?.fullName || "Chưa có trưởng khoa"}
            </h1>
            <h1 className="font-bold text-black75 text-xs">Trưởng khoa</h1>
          </div>
        </div>
        <div className="mt-2 flex flex-col border rounded-2xl py-4 px-6">
          <div className=" flex items-end gap-2 font-semibold">
            <div className="flex items-center justify-between w-full">
              <h1 className="flex items-center gap-2">
                <Users />
                Nhân viên:
              </h1>
              <Search
                setParams={setParams}
                placeholder={"Tìm kiếm nhân viên"}
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-2 mt-4 grid-cols-2">
            {counsellors &&
              counsellors.map((counsellor) => {
                return (
                  <StaffInfoBox
                    key={counsellor._id}
                    data={counsellor}
                    chooseDephead={chooseDephead}
                  />
                );
              })}
          </div>
          <div className="w-full flex items-center justify-center mt-4">
            <Pagination
              page={params.page}
              setParams={setParams}
              pages={pages}
            />
          </div>
        </div>
      </div>
    </ItemLayout>
  );
};
