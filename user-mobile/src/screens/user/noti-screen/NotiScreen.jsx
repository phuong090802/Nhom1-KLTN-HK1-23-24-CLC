import Layout from "../../../template/layout";
import { NotiScreenContent } from "./NotiScreenContent";
import { NotiScreenStore } from "./NotiScreenStore";

const NotiScreen = () => {
  return (
    <NotiScreenStore>
      <Layout>
        <NotiScreenContent />
      </Layout>
    </NotiScreenStore>
  );
};

export default NotiScreen;
