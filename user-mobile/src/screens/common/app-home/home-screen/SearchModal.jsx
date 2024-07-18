import { useCallback, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../../../../../constant";
import MyButton from "../../../../atom/my-button";
import IconInput from "../../../../molecule/icon-input";
import MySelect from "../../../../molecule/my-select";
import ModalLayout from "../../../../template/modal-layout/ModalLayout";
import { HomeContext } from "./HomeStore";
import { modalName } from "./const";
import useDepartmentField from "../../../../hooks/useDepartmentField";

const SearchModal = () => {
  const {
    setParams,
    params,
    setQuestions,
    showingModal,
    setShowingModal,
  } = useContext(HomeContext);

  const [keyword, setKeyword] = useState("");

  const {
    deps,
    selectedDep,
    setSelectedDep,
    fields,
    selectedField,
    setSelectedField,
  } = useDepartmentField();

  const onClose = useCallback(() => {
    setShowingModal((prev) => {
      return prev.filter((modal) => modal !== modalName.search);
    });
  }, [setShowingModal]);

  const handleDepSelect = (value) => {
    setSelectedDep(value === "null" ? null : value);
  };

  const handleFieldSelect = (value) => {
    setSelectedField(value === "null" ? null : value);
  };

  const handleSearchChange = useCallback((value) => {
    setKeyword(value);
  }, []);

  const searchHandle = () => {
    let tempFilter = { ...params.filter };
    console.log("searchHandle", tempFilter);
    if (!selectedDep) tempFilter = {};
    else {
      tempFilter.department = selectedDep;
      if (!selectedField) delete tempFilter.fieldId;
      else tempFilter.field = selectedField;
    }
    setParams((prev) => ({ ...prev, filter: tempFilter, skip: 0, keyword }));
  };

  const submit = useCallback(() => {
    setQuestions([]);
    searchHandle();
    onClose();
  }, [searchHandle]);

  return (
    <ModalLayout
      visible={showingModal.includes(modalName.search)}
      onClose={onClose}
      title={"Tìm kiếm câu hỏi"}
    >
      <View style={styles.rootContainer}>
        <IconInput
          iconPackage={"Ionicons"}
          icon={"search"}
          placeholder={"Từ khóa"}
          value={params.keyword || ""}
          onChange={handleSearchChange}
        />
        <MySelect
          data={deps || []}
          onChange={handleDepSelect}
          iconPackage={"Octicons"}
          iconName={"organization"}
          iconColor={colors.black75}
          placeholder={"Chọn khoa"}
          defaultOption={
            selectedDep
              ? deps.find((dep) => dep.key === selectedDep)
              : { key: null, value: "Chọn khoa" }
          }
        />
        <MySelect
          data={fields || []}
          onChange={handleFieldSelect}
          iconPackage={"Octicons"}
          iconName={"stack"}
          iconColor={colors.black75}
          placeholder={"Chọn lĩnh vực"}
          defaultOption={
            selectedField && fields
              ? fields.find((field) => field.key === selectedField)
              : { key: null, value: "Chọn lĩnh vực" }
          }
        />
        <View style={{}}>
          <MyButton title={"Tìm kiếm"} onPress={submit} />
        </View>
      </View>
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    gap: 16,
  },
});

export default SearchModal;
