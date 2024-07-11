import { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { colors } from "../../../../constance";
import { SearchArea } from "./SearchArea";

export const SearchModal = ({ visible, onClose, params, setParams }) => {
  const [keyword, setKeyword] = useState(false);

  const [firstRender, setFirstRender] = useState(true);

  const timeOutId = useRef();

  const handleSearch = () => {
    if (setParams && !firstRender) {
      clearTimeout(timeOutId.current);
      timeOutId.current = setTimeout(() => {
        setParams((prev) => ({ ...prev, keyword: keyword, page: 1 }));
      }, 2000);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [keyword]);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    }
  }, []);

  // useEffect(() => {
  //   setKeyword(params.keyword);
  // }, [params]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.container}>
        <SearchArea
          onClose={onClose}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black10,
    paddingHorizontal: 16,
    zIndex: 1,
  },
});
