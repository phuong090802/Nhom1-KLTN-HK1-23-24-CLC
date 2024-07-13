import { ScrollView, StyleSheet, Text, View } from "react-native";
import TitleBar from "../../../molecule/title-bar";
import { colors, fonts } from "../../../../constant";
import { useNavigation } from "@react-navigation/native";
import { FakeData } from "./const";
import { DropdownItem } from "./DropDownItem";
import { useContext } from "react";
import { AskedQuestionContext } from "./AskedQuestionStore";

export const AskedQuestionContent = () => {
  const context = useContext(AskedQuestionContext);

  const navigation = useNavigation();

  const handleItemSelect = (id) => {
    if (id === context.selected) {
      context.setSelected(-1);
    } else {
      context.setSelected(id);
    }
  };

  return (
    <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
      <TitleBar
        title={"Câu hỏi đã hỏi"}
        onBack={() => {
          navigation.navigate("UserMenu");
        }}
      />
      <View style={{ marginTop: 8 }}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => handleLazy(nativeEvent)}
        >
          {FakeData.map((question) => {
            return (
              <DropdownItem
                key={question._id}
                data={question}
                id={question._id}
                isOpen={context.selected === question._id}
                onSelect={() => handleItemSelect(question._id)}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
