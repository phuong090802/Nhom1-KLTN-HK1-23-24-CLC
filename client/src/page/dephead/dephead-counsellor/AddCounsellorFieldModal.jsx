import React, { useContext, useEffect, useState } from "react";
import ModalLayout2 from "../../../layout/modal-layout-2/ModalLayout2";
import { DepheadCounsellorContext } from "./DepheadCounsellorStore";
import {
  addFieldsForCounSv,
  getFieldToAddForCounSv,
} from "../../../service/dephead/depheadCounsellor.sv";
import { toast } from "sonner";
import MyButton from "../../../atom/my-button";
import clsx from "clsx";
import { CircleCheck } from "lucide-react";
import { colors } from "../../../constance";

export const AddCounsellorFieldModal = () => {
  const {
    hiddenAddCounField,
    setHiddenAddCounField,
    selected,
    depheadGetCounsellors,
  } = useContext(DepheadCounsellorContext);

  const [fields, setFields] = useState([]);

  const [selectedFields, setSelectedFields] = useState([]);

  const getFieldsToAdd = async () => {
    try {
      const response = await getFieldToAddForCounSv(selected);
      setFields(response?.fields);
    } catch (error) {
      // toast.warning("Lỗi khi lấy danh sách lĩnh vực")
    }
  };

  const itemClick = (id) => {
    if (selectedFields.includes(id)) {
      setSelectedFields((prev) => {
        const index = prev.indexOf(id);
        if (index > -1) {
          return prev.splice(index, 1);
        } else return prev;
      });
    } else {
      setSelectedFields((prev) => [...prev, id]);
    }
  };

  const handleAddCounsellorFields = async () => {
    if (selectedFields.length === 0) {
      toast.warning("Chưa có lĩnh vực nào được chọn!!!");
      return;
    }
    try {
      const response = await addFieldsForCounSv(selected, selectedFields);
      console.log("response", response);
      if (response?.failedFields?.length === 0) {
        toast.success(
          response?.message || "Thêm lĩnh vực cho tư vấn viên thành công"
        );
        setFields((prev) =>
          prev.filter((item) => !selectedFields.includes(item._id))
        );
      } else {
        toast.warning(
          `Có lỗi khi xảy ra khi thêm các lĩnh vực: "${response.failedFieldIds?.join(
            ", "
          )}"`
        );
        setFields((prev) =>
          prev.filter(
            (item) =>
              (!selectedFields?.includes(item._id) ||
              response.failedFieldIds?.includes(item._id))
          )
        );
      }
      setSelectedFields([]);
      depheadGetCounsellors();
    } catch (error) {
      toast.success(
        error?.message || "Lỗi khi thêm lĩnh vực cho tư vấn viên!!"
      );
    }
  };

  useEffect(() => {
    if (selected !== -1) {
      setFields([]);
      setSelectedFields([]);
      getFieldsToAdd();
    }
  }, [selected]);

  return (
    <ModalLayout2
      text="Thêm lĩnh vực cho tư vấn viên"
      hidden={hiddenAddCounField}
      setHidden={setHiddenAddCounField}
    >
      <h1 className="font-bold text-black50">Danh sách lĩnh vực:</h1>
      <div className="border rounded-lg overflow-hidden">
        <div className="w-96 max-h-96 overflow-y-auto">
          {fields &&
            fields.map((field) => {
              return (
                <div
                  className={clsx(
                    "py-2 hover:bg-primary/20 cursor-pointer duration-300"
                  )}
                  key={field._id}
                  onClick={() => itemClick(field._id)}
                >
                  <div className="flex justify-between">
                    <p className="pl-4 pr-8 text-black75">{field.fieldName}</p>
                    {selectedFields.includes(field._id) && (
                      <CircleCheck color={colors.success} />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <MyButton
        className="bg-primary mt-2 float-right"
        onClick={handleAddCounsellorFields}
      >
        Thêm
      </MyButton>
    </ModalLayout2>
  );
};
