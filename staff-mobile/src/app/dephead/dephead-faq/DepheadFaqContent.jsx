import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DepheadFaqContext } from "./DepheadFaqProvider";
import ScreenHeader from "../../../component/molecule/screen-header";
import ItemSkeleton from "../../../component/molecule/item-skeleton";
import Pagination from "../../../component/molecule/pagination";
import SortFilter from "../../../component/organism/sort-filter";
import { Item } from "./Item";
import { FaqDetailModal } from "./FaqDetailModal";
import { sortData } from "./constance";
import { AddFaqModal } from "./AddFaqModal";
import { colors } from "../../../../constance";

export const DepheadFaqContent = () => {
  const {
    params,
    setParams,
    pages,
    faqs,
    loading,
    filterData,
    setShowAddFaqModal,
  } = useContext(DepheadFaqContext);

  return (
    <View style={styles.container}>
      <FaqDetailModal />
      <AddFaqModal />
      <ScreenHeader
        title={"Quản lý Faq"}
        params={params}
        setParams={setParams}
        onAdd={() => setShowAddFaqModal(true)}
      />
      <SortFilter
        filterData={filterData}
        sortData={sortData}
        setParams={setParams}
      />
      <ScrollView
        style={styles.contentContaier}
        showsVerticalScrollIndicator={false}
      >
        <ItemSkeleton loading={loading} />
        {!loading && faqs.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 100,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: colors.primary,
            }}
          >
            <Text>Không có câu hỏi chờ!</Text>
          </View>
        ) : (
          faqs.map((faq, index) => <Item key={faq?._id || index} data={faq} />)
        )}
        <Pagination page={params.page} pages={pages} setParams={setParams} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 8, paddingTop: 8 },
  contentContaier: { marginTop: 8, marginBottom: 96 },
});
