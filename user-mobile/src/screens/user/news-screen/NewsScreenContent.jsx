import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../constant";
import TitleBar from "../../../molecule/title-bar";
import { NewsScreenContext } from "./NewsScreenStore";
import { Item } from "./Item";

export const NewsScreenContent = () => {
  const { news } = useContext(NewsScreenContext);

  return (
    <View style={styles.containner}>
      <TitleBar title={"Tin tức"} />
      <ScrollView style={{ marginTop: 8 }} showsVerticalScrollIndicator={false}>
        {news && news.map((n) => <Item key={n._id} data={n} />)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
