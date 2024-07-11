import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../../component/molecule/screen-header";
import SortFilter from "../../../component/organism/sort-filter";
import { ItemSkeletons } from "./ItemSkeletons";
import Pagination from "../../../component/molecule/pagination";
import { AdminUserContext } from "./AdminUserProvider";
import { Item } from "./Item";
import { filterData, sortData } from "./constance";
import { DetailUserModal } from "./DetailUserModal";
import { AddUserModal } from "./AddUserModal";

export const AdminUserContent = () => {
  const { pages, users, params, setParams, setShowAddUserModal } =
    useContext(AdminUserContext);
  return (
    <View style={styles.container}>
      <DetailUserModal />
      <AddUserModal />
      <ScreenHeader
        title={"Quản lý người dùng"}
        params={params}
        setParams={setParams}
        onAdd={() => setShowAddUserModal(true)}
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
        {users.map((user, index) => (
          <Item key={user?._id || index} data={user} />
        ))}
        <Pagination page={params.page} pages={pages} setParams={setParams} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 8, paddingTop: 8 },
  contentContaier: { marginTop: 8, marginBottom: 96 },
});
