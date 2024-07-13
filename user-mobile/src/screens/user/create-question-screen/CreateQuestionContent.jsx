import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../../../constant";
import TitleBar from "../../../molecule/title-bar";
import CreateQuestionForm from "./CreateQuestionForm";

const CreateQuestionContent = () => {
  return (
    <View style={style.container}>
      <TitleBar title={"Đặt câu hỏi"} />
      <ScrollView style={{ marginTop: 8 }} showsVerticalScrollIndicator={false}>
        <CreateQuestionForm />
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});

export default CreateQuestionContent;
