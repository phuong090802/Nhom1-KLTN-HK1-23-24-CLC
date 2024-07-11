import { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Pagination from "../../../component/molecule/pagination";
import SortFilter from "../../../component/organism/sort-filter";
import { AdminDepContext } from "./AdminDepProvider";
import { Header } from "./Header";
import { Item } from "./Item";
import { ItemSkeletons } from "./ItemSkeletons";
import { UpdateDepartmentModal } from "./UpdateDepartmentModal";
import { filterData, sortData } from "./constance";
import { AddDepModal } from "./AddDepModal";
import { DetailDepModal } from "./DetailDepModal";

export const AdminDepContent = () => {
  const { deps, pages, params, setParams } = useContext(AdminDepContext);

  return (
    <>
      <DetailDepModal />
      <AddDepModal />
      <UpdateDepartmentModal />
      <View style={styles.container}>
        <Header />
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
          {deps.map((dep, index) => (
            <Item key={dep?._id || index} data={dep} />
          ))}
          <Pagination page={params.page} pages={pages} setParams={setParams} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 8, paddingTop: 8 },
  contentContaier: { marginTop: 8, marginBottom: 96 },
});
