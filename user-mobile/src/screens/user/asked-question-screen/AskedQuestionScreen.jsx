import { StyleSheet, Text, View } from "react-native";
import Layout from "../../../template/layout/Layout";
import { AskedQuestionStore } from "./AskedQuestionStore";
import { AskedQuestionContent } from "./AskedQuestionContent";

const AskedQuestionScreen = () => {
  return (
    <AskedQuestionStore>
      <Layout>
        <AskedQuestionContent />
      </Layout>
    </AskedQuestionStore>
  );
};

const styles = StyleSheet.create({});
export default AskedQuestionScreen;
