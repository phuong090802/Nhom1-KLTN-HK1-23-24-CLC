import { useState } from "react";
import MyButton from "../../atom/my-button";
import MySelect from "../../atom/my-select";
import ModalLayout from "../../template/modal-layout";
import ModalLayout2 from "../../template/modal-layout-2";
import { Sort } from "./Sort";

const SortFilterModal = ({
  modalTitle,
  onClose,
  hidden,
  filters,
  sorts,
  params,
  setParams,
}) => {
  const [tempFilter, setTempFilter] = useState(params.filter);

  const [tempSort, setTempSort] = useState(params.sort);

  const handleSortChange = (key, value) => {
    {
      setTempSort((prev) => ({
        ...prev,
        [key]: value === 1 ? -1 : 1,
      }));
    }
  };

  const handleFilterChange = (value, filterName) => {
    if (value === "null")
      filterName
        ? setTempFilter(delete tempFilter[filterName])
        : setTempFilter(null);
    setTempFilter((prev) => ({ ...prev, [filterName]: value }));
  };

  return (
    <ModalLayout2
      hidden={hidden}
      onClose={onClose}
      text={modalTitle}
      setHidden={onClose}
    >
      <div className="border px-4 rounded-lg mt-2 pb-2">
        <div className="">
          <h1 className="font-bold text-black75">Lọc kết quả</h1>
          {filters &&
            filters.map((filter, index) => {
              return (
                <div key={filter.label.value || index}>
                  <label className="text-xs font-semibold text-black75">
                    {filter.label.key + ":"}
                  </label>
                  <MySelect
                    data={filter.data}
                    name={filter.label.value}
                    value={tempFilter[filter.label.value]}
                    onChange={(value) =>
                      handleFilterChange(value, filter.label.value)
                    }
                  />
                </div>
              );
            })}
        </div>
        <div className="mt-4 border-t-2">
          <h1 className="font-bold text-black75">Sắp xếp</h1>
          <div className="grid grid-cols-2">
            {sorts &&
              sorts.map((sort, index) => {
                return (
                  <Sort
                    key={sort.label.value || index}
                    data={sort.data}
                    label={sort.label}
                    value={tempSort[sort.label.value]}
                    onChange={() =>
                      handleSortChange(
                        sort.label.value,
                        tempSort[sort.label.value]
                      )
                    }
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full items-end mt-2">
        <MyButton
          className="bg-primary"
          onClick={() =>
            setParams((prev) => ({
              ...prev,
              filter: tempFilter,
              sort: tempSort,
            }))
          }
        >
          Lọc
        </MyButton>
      </div>
    </ModalLayout2>
  );
};

export default SortFilterModal;
