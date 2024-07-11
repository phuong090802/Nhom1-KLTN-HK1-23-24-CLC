import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import MyIcon from "../../atomic/my-icon";
import { colors } from "../../../../constance";
import { SearchModal } from "./SearchModal";

const Search = ({ params, setParams }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <SearchModal
        visible={visible}
        onClose={() => setVisible(false)}
        params={params}
        setParams={setParams}
      />
      <TouchableOpacity activeOpacity={0.4} onPress={() => setVisible(true)}>
        <MyIcon
          iconPackage="Ionicons"
          name={"search"}
          size={32}
          color={colors.black75}
        />
      </TouchableOpacity>
    </>
  );
};

export default Search;
