import { useContext } from "react";
import StaffTitleBar from "../../../molecule/staff-title-bar";
import { Item } from "./Item";
import { DepheadFieldContext } from "./DepheadFieldStore";
import Pagination from "../../../molecule/pagination";
import SortFilterModal from "../../../organism/sort-filter-modal";
import { DepheadAddFIeldModal } from "./DepheadAddFIeldModal";

export const DepheadFieldContent = () => {
  const {
    fields,
    setFields,
    params,
    setParams,
    updateFieldStatus,
    pages,
    hiddenFilterSort,
    setHiddenFilterSort,
    sort,
    filter,
    setHiddenAddField,
  } = useContext(DepheadFieldContext);

  return (
    <>
      <DepheadAddFIeldModal />
      <SortFilterModal
        hidden={hiddenFilterSort}
        onClose={() => setHiddenFilterSort(true)}
        params={params}
        setParams={setParams}
        sorts={sort}
        filters={filter}
      />
      <StaffTitleBar
        title={"Quản lý lĩnh vực"}
        onSearchFilter={() => setHiddenFilterSort(false)}
        setParams={setParams}
        onAdd={() => setHiddenAddField(false)}
      />
      <div className="mt-2 grid gap-2">
        {fields &&
          fields.map((field) => {
            return (
              <Item
                key={field._id}
                fieldName={field.fieldName}
                status={field.isActive}
                onStatus={() =>
                  updateFieldStatus(field._id, { isActive: !field.isActive })
                }
              />
            );
          })}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination page={params.page} setParams={setParams} pages={pages} />
      </div>
    </>
  );
};
