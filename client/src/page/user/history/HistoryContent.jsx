import clsx from "clsx";
import { History, Star } from "lucide-react";
import { useContext, useState } from "react";
import { DetailQuestionModal } from "./DetailQuestionModal";
import { LikeHistoryTable } from "./LikeHistoryTable";
import { QuestionsHistoryTable } from "./QuestionsHistoryTable";
import { HistoryContext } from "./HistoryStore";

export const HistoryContent = () => {
  const { showingContent, setShowingContent } = useContext(HistoryContext);

  return (
    <div className="mt-2 mb-4">
      <DetailQuestionModal />
      <div className="bg-white px-4 shadow-black50 shadow-lg py-4 rounded-2xl border">
        <p className="font-bold text-2xl mb-2 px-4 text-black75">Lịch sử</p>
        <div className="flex gap-2 px-4">
          <button
            onClick={() => setShowingContent("questionHistory")}
            className={clsx(
              "flex gap-2 border-primary px-2 py-1 duration-500",
              showingContent === "questionHistory" &&
                "border-b-2 text-primary font-bold"
            )}
          >
            <History />
            Lịch sử câu hỏi
          </button>
          <button
            onClick={() => setShowingContent("likeHistory")}
            className={clsx(
              "flex gap-2 border-primary px-2 py-1 duration-500",
              showingContent === "likeHistory" &&
                "border-b-2 text-primary font-bold"
            )}
          >
            <Star />
            Lịch sử yêu thích
          </button>
        </div>
        <div className="px-4">
          {showingContent === "questionHistory" ? (
            <QuestionsHistoryTable />
          ) : (
            <LikeHistoryTable />
          )}
        </div>
      </div>
    </div>
  );
};
