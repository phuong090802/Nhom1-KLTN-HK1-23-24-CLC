import React, { useCallback, useContext } from "react";
import { MessageCircle } from "lucide-react";
import { AppLayoutContext } from "./AppLayoutStore";
import clsx from "clsx";
import { DataContext } from "../../store";
import default_avatar from "../../assets/image/default_avatar.png";

export const ConversationsButton = () => {
  const {
    showingModal,
    setShowingModal,
    conversations,
    setMessageBoxHidden,
    setSelectedConversation,
  } = useContext(AppLayoutContext);

  const { user, darkMode } = useContext(DataContext);

  const handleClick = useCallback(() => {
    if (showingModal === "message") setShowingModal("");
    else setShowingModal("message");
  }, [setShowingModal, showingModal]);

  const handleConversationClick = useCallback(
    (conversation) => {
      console.log(conversation);
      setMessageBoxHidden(false);
      setSelectedConversation(conversation);
      setShowingModal("");
    },
    [setMessageBoxHidden, setSelectedConversation, setShowingModal]
  );

  return (
    <div className="relative">
      <div
        className={clsx(
          "w-10 h-10 flex justify-center items-center rounded-full bg-black10 cursor-pointer",
          darkMode && "bg-white/10"
        )}
      >
        <MessageCircle className="cursor-pointer" onClick={handleClick} />
      </div>
      <div
        className={clsx(
          "w-96 max-h-[80vh] border bg-white rounded-lg absolute z-10 -right-8 py-4 overflow-y-auto cursor-pointer",
          showingModal !== "message" && "hidden"
        )}
      >
        <h1 className="text-2xl font-bold text-black75 mb-4 px-4">Đoạn chat</h1>
        {conversations.map((conversation) => {
          return (
            <div
              className="flex items-center gap-2 hover:bg-black10 py-2 px-4 rounded-lg"
              key={conversation._id}
              onClick={() => handleConversationClick(conversation)}
            >
              <img
                src={conversation?.otherUser?.avatar || default_avatar}
                alt="user avatar"
                className="w-14 h-14 rounded-full"
              />
              <div>
                <p className="font-bold text-black75">
                  {conversation?.otherUser?.fullName || "User Name"}
                </p>
                <div className="text-sm font-semibold text-black50 ">
                  {user?._id === conversation?.lastMessage?.sender && (
                    <p className="inline-block">Bạn: </p>
                  )}
                  <span
                    className="inline-block"
                    dangerouslySetInnerHTML={{
                      __html: conversation?.lastMessage?.content,
                    }}
                  ></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
