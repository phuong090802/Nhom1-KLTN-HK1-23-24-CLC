import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import MyIcon from "../../atomic/my-icon";
import { colors } from "../../../../constance";
import { FilterModal } from "./FilterModal";

const Filter = ({ data, setParams }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={data}
        setParams={setParams}
      />
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => setModalVisible(true)}
      >
        <MyIcon
          iconPackage="Foundation"
          name={"filter"}
          size={28}
          color={colors.black75}
        />
      </TouchableOpacity>
    </>
  );
};

export default Filter;
