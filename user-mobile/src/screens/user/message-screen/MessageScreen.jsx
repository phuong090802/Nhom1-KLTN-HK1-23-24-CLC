import React from "react";
import { MessageScreenContent } from "./MessageScreenContent";
import { MessageScreenStore } from "./MessageScreenStore";
import Layout from "../../../template/layout";

const MessageScreen = () => {
  return (
    <MessageScreenStore>
      <Layout>
        <MessageScreenContent />
      </Layout>
    </MessageScreenStore>
  );
};

export default MessageScreen;
