import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DepheadAproveContext } from "./DepheadAproveProvider";
import ScreenHeader from "../../../component/molecule/screen-header";
import ItemSkeleton from "../../../component/molecule/item-skeleton";
import { Item } from "./Item";
import Pagination from "../../../component/molecule/pagination";
import { AproveDetailModal } from "./AproveDetailModal";
import { colors, fonts } from "../../../../constance";

export const DepheadAproveContent = () => {
  const { pages, params, setParams, answers, loading } =
    useContext(DepheadAproveContext);
  return (
    <View style={styles.container}>
      <AproveDetailModal />
      <ScreenHeader
        params={params}
        setParams={setParams}
        title={"Duyệt câu trả lời"}
      />
      <ScrollView
        style={styles.contentContaier}
        showsVerticalScrollIndicator={false}
      >
        <ItemSkeleton loading={loading} />
        {answers?.length === 0 && loading === false ? (
          <View
            style={{
              justifyContent: "center",
              height: 100,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 16,
              borderColor: colors.primary,
            }}
          >
            <Text style={styles.text}>
              Không có câu trả lời nào chờ duyệt!!
            </Text>
          </View>
        ) : (
          answers.map((answer, index) => (
            <Item key={answer?._id || index} data={answer} />
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
  text: {
    fontFamily: fonts.BahnschriftBold,
    fontSize: 16,
    color: colors.black50,
  },
});
