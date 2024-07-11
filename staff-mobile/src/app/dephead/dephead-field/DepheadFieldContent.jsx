import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../../component/molecule/screen-header";
import SortFilter from "../../../component/organism/sort-filter";
import { useContext } from "react";
import { DepheadFieldContext } from "./DepheadFieldProvider";
import { Item } from "./Item";
import Pagination from "../../../component/molecule/pagination";
import { ItemSkeletons } from "./ItemSkeletons";
import { filterData, sortData } from "./constance";
import { AddFieldModal } from "./AddFieldModal";
import { UpdateFieldModal } from "./UpdateFieldModal";

export const DepheadFieldContent = () => {
  const { fields, params, setParams, pages, setShowAddFieldModal } =
    useContext(DepheadFieldContext);

  return (
    <View style={styles.container}>
      <AddFieldModal />
      <UpdateFieldModal />
      <ScreenHeader
        title={"Quản lý lĩnh vực"}
        params={params}
        setParams={setParams}
        onAdd={() => setShowAddFieldModal(true)}
      />
      <SortFilter
        sortData={sortData}
        filterData={filterData}
        setParams={setParams}
      />
      <ScrollView
        style={styles.contentContaier}
        showsVerticalScrollIndicator={false}
      >
        <ItemSkeletons />
        {fields.map((field, index) => (
          <Item key={field?._id || index} data={field} />
        ))}
        <Pagination page={params.page} setParams={setParams} pages={pages} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 8, paddingTop: 8 },
  contentContaier: { marginTop: 8, marginBottom: 96 },
});
