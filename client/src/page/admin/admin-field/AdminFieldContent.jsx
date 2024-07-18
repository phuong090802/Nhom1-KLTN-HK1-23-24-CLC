import React, { useContext } from "react";
import StaffTitleBar from "../../../molecule/staff-title-bar";
import { AdminFieldContext } from "./AdminFieldStore";
import { modalName } from "./const";
import { AddGeneralFieldModal } from "./AddGeneralFieldModal";
import { Item } from "./Item";
import { AdminFieldTable } from "./AdminFieldTable";
import Pagination from "../../../molecule/pagination";

export const AdminFieldContent = () => {
  const { generalField, params, setParams, pages, setShowingModal } =
    useContext(AdminFieldContext);

  return (
    <>
      <AddGeneralFieldModal />
      <StaffTitleBar
        title={"Quản lý lĩnh vực chung"}
        onAdd={() => {
          setShowingModal((prev) => [...prev, modalName.addGeneralField]);
        }}
        setParams={setParams}
      />
      <div className="mt-2 grid gap-2">
        {generalField?.length === 0 ? (
          <div className="flex w-full justify-center border py-20 rounded-xl bg-white shadow-lg shadow-black75 text-lg font-bold">
            Không có dữ liệu!!
          </div>
        ) : (
          <AdminFieldTable />
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination page={params.page} setParams={setParams} pages={pages} />
      </div>
    </>
  );
};
