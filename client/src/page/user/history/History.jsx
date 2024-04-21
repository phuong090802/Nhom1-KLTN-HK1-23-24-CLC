import React from "react";
import { HistoryStore } from "./HistoryStore";
import { HistoryContent } from "./HistoryContent";

const History = () => {
  return (
    <HistoryStore>
      <HistoryContent />
    </HistoryStore>
  );
};

export default History;
