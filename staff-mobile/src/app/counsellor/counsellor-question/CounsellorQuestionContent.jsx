import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../../component/molecule/screen-header";
import { useContext } from "react";
import { CounsellorQuestionContext } from "./CounsellorQuestionProvider";
import SortFilter from "../../../component/organism/sort-filter";
import ItemSkeleton from "../../../component/molecule/item-skeleton";
import { Item } from "./Item";
import Pagination from "../../../component/molecule/pagination";
import { DetailModal } from "./DetailModal";
import { colors } from "../../../../constance";
import { ForwardQuestionModal } from "./ForwardQuestionModal";

export const CounsellorQuestionContent = () => {
  const { pages, params, setParams, loading, question } = useContext(
    CounsellorQuestionContext
  );
  return (
    <View style={styles.container}>
      <ForwardQuestionModal />
      <DetailModal />
      <ScreenHeader
        title={"Phản hồi câu hỏi"}
        params={params}
        setParams={setParams}
      />
      <SortFilter filterData={[]} sortData={[]} setParams={setParams} />

      <ScrollView
        style={styles.contentContaier}
        showsVerticalScrollIndicator={false}
      >
        <ItemSkeleton loading={loading} />
        {!loading && question?.length === 0 ? (
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
          question.map((ques, index) => (
            <Item key={ques?._id || index} data={ques} />
          ))
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
