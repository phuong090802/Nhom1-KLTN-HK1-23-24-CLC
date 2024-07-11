import React, { useContext, useEffect, useState } from "react";
import ModalLayout from "../../../component/molecule/modal-layout";
import { DepheadCounsellorContext } from "./DepheadCounsellorProvider";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import {
  depheadAddFieldsForCounSv,
  depheadGetFieldsToAddSv,
} from "../../../service/dephead/depheadCounsellor.sv";
import { colors, fonts } from "../../../../constance";
import MyIcon from "../../../component/atomic/my-icon";
import MyButton from "../../../component/atomic/my-button";

export const AddFieldsModal = () => {
  const {
    setShowAddFieldsModal,
    showAddFieldsModal,
    selectedCounsellor,
    getCounsellors,
    setSelectedCounsellor,
  } = useContext(DepheadCounsellorContext);

  //Mảng chứa các fields có thể thêm
  const [fields, setFields] = useState([]);

  //Những field đã được chọn
  const [selectedFields, setSelectedFields] = useState([]);


  //xử lý việc ấn vào một field
  const handleItemPress = (id) => {
    if (selectedFields.includes(id)) {
      setSelectedFields((prev) => {
        const index = prev.indexOf(id);
        if (index > -1) {
          return prev.filter((item) => item !== id);
        } else return prev;
      });
    } else {
      setSelectedFields((prev) => [...prev, id]);
    }
  };

  //Hàm lấy fields để add cho mỗi counsellor
  const getFieldToAddForCounsellor = async () => {
    try {
      const response = await depheadGetFieldsToAddSv(selectedCounsellor._id);
      setFields(response.fields);
    } catch (error) {
      // console.log(error);
    }
  };

  //Hàm nối tên các lĩnh vực trong một mảng
  function joinFieldNames(failedFields) {
    const fieldNames = failedFields.map((field) => field.fieldName);
    return fieldNames.join(", ");
  }

  //Hàm kiểm kiểm tra id lĩnh vực có trong mảng không
  function isIdInFailedFields(failedFields, idToCheck) {
    return failedFields.some((field) => field._id === idToCheck);
  }

  //Hàm xử lý thêm fields
  const handleAddFields = async () => {
    if (selectedFields.length === 0) {
      ToastAndroid.show(
        "Chưa có lĩnh vực nào được chọn!!!",
        ToastAndroid.SHORT
      );
      return;
    }

    try {
      const response = await depheadAddFieldsForCounSv(
        selectedCounsellor._id,
        selectedFields
      );

      setSelectedFields([]);
      
      //Nếu tất cả lĩnh vực được thêm thành công
      if (response?.failedFields?.length === 0) {
        ToastAndroid.show(
          response?.message || "Thêm lĩnh vực cho tư vấn viên thành công",
          ToastAndroid.SHORT
        );
        setSelectedCounsellor((prev) => {
          const addedField = fields.filter((field) =>
            selectedFields.includes(field._id)
          );
          return { ...prev, fields: [...prev.fields, ...addedField] };
        });
        setFields((prev) =>
          prev.filter((item) => !selectedFields.includes(item._id))
        );
      } 
      //Nếu có ít nhất một trong các lĩnh vực thêm thất bại
      else {
        ToastAndroid.show(
          `Có lỗi khi xảy ra khi thêm các lĩnh vực: "${joinFieldNames(
            response.failedFields
          )}"`,
          ToastAndroid.LONG
        );
        setSelectedCounsellor((prev) => {
          const addedField = fields.filter(
            (field) =>
              selectedFields?.includes(field._id) &&
              !isIdInFailedFields(response.failedFields, field._id)
            // !response.failedFields?.includes(field._id)
          );
          return { ...prev, fields: [...prev.fields, ...addedField] };
        });
        setFields((prev) =>
          prev.filter(
            (item) =>
              !selectedFields?.includes(item._id) ||
              isIdInFailedFields(response.failedFields, item._id)
            // response.failedFields?.includes(item._id)
          )
        );
      }
    } catch (error) {
      //Lỗi khi thêm
      ToastAndroid.show(
        error?.message || "Lỗi khi thêm lĩnh vực cho tư vấn viên!!",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    if (selectedCounsellor?._id) {
      getFieldToAddForCounsellor();
      setSelectedFields([]);
    }
  }, [selectedCounsellor]);

  return (
    <ModalLayout
      visible={showAddFieldsModal}
      onClose={() => setShowAddFieldsModal(false)}
      title={"Thêm lĩnh vực cho tư vấn viên"}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {fields.map((field, index) => {
          return (
            <TouchableOpacity
              key={field?._id || index}
              activeOpacity={0.6}
              onPress={() => handleItemPress(field._id)}
              style={[
                styles.itemContainer,
                selectedFields?.includes(field?._id) && styles.selected,
              ]}
            >
              <Text
                style={[styles.text, { maxWidth: "80%", paddingVertical: 6 }]}
              >
                {field?.fieldName}
              </Text>
              {selectedFields?.includes(field._id) && (
                <MyIcon
                  iconPackage="Octicons"
                  name={"check-circle"}
                  color={colors.success}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <MyButton
        buttonText={`Thêm lĩnh vực (${selectedFields?.length || 0})`}
        style={{ marginTop: 8, backgroundColor: colors.black }}
        onPress={handleAddFields}
      />
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 8,
    gap: 8,
    borderWidth: 0.5,
    // paddingHorizontal: 16,
    // paddingTop: 8,
    borderRadius: 16,
    maxHeight: 400,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  selected: {
    backgroundColor: colors.success20,
  },
  text: {
    fontFamily: fonts.BahnschriftRegular,
    fontSize: 18,
  },
});
