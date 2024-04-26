import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import default_avatar from "../../assets/image/default_avatar.png";
import { X, SendHorizontal } from "lucide-react";
import { AppLayoutContext } from "./AppLayoutStore";
import clsx from "clsx";
import { DataContext } from "../../store";
import MyRichText from "../../atom/my-rich-text/MyRichText";

export const MessageBox = () => {
  const { messageBoxHidden } = useContext(AppLayoutContext);

  return (
    <div
      className={clsx(
        "fixed bottom-0 right-4 z-10",
        messageBoxHidden && "hidden"
      )}
    >
      <div className="border border-black25 rounded-t-lg bg-white w-80 ">
        <MessageBoxHeader />
        <MessageBoxBody />
        <ResponseInput />
      </div>
    </div>
  );
};

const MessageBoxHeader = () => {
  const { setMessageBoxHidden, selectedConversation } =
    useContext(AppLayoutContext);

  const MessageBoxHeaderComponent = useMemo(() => {
    const handleHidden = () => {
      setMessageBoxHidden((prev) => !prev);
    };
    return (
      <div className="flex items-center justify-between p-2 z-40">
        <div className="">
          <img
            src={selectedConversation?.otherUser?.avatar || default_avatar}
            alt="user_avatar"
            className="w-8 h-8 border-2 border-primary rounded-full inline-block"
          />
          <p className="text-base inline-block ml-1 font-semibold text-black75">
            {selectedConversation?.otherUser?.fullName}
          </p>
        </div>
        <X className="text-primary cursor-pointer" onClick={handleHidden} />
      </div>
    );
  }, [selectedConversation, setMessageBoxHidden]);

  return MessageBoxHeaderComponent;
};

const MessageBoxBody = () => {
  const { conversationContent, loadMessage, selectedConversation, params } =
    useContext(AppLayoutContext);

  const divRef = useRef(null);

  const hanldeScroll = (e) => {
    if (e.target.scrollTop === 0) {
      console.log("touching top");
      loadMessage();
    } else {
      // console.log("not touching top");
    }
  };

  useEffect(() => {
    if (selectedConversation?._id) {
      const scrollToBottom = () => {
        divRef.current.scrollIntoView({ behavior: "instant" });
      };
      if (conversationContent?.length <= params.size) {
        scrollToBottom();
      }
    }
  }, [selectedConversation, conversationContent]);

  return (
    <div className="border-t ">
      <div
        className="flex w-full flex-col gap-1 overflow-y-scroll h-96 px-2 py-4"
        onScroll={hanldeScroll}
      >
        {conversationContent?.map((message) => (
          <MessageBubble
            key={message._id}
            content={message.content}
            senderId={message.sender}
          />
        ))}
        <div ref={divRef} />
      </div>
    </div>
  );
};

const MessageBubble = ({ content, senderId }) => {
  const { user } = useContext(DataContext);

  const MessageBubbleComponent = useMemo(() => {
    return (
      <div
        className={clsx(
          "px-3 py-2 rounded-2xl inline-block max-w-52 border border-black25",
          user._id === senderId
            ? "self-end bg-blue-200"
            : "self-start  bg-white"
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }, [content, senderId]);

  return MessageBubbleComponent;
};

const ResponseInput = () => {
  const { messageContent, setMessageContent, sendMessage } =
    useContext(AppLayoutContext);

  return (
    <div className="flex items-center  border-t">
      <MyRichText
        className="w-full py-2 pl-4 outline-none min-h-10 max-h-40 border-none overflow-y-auto"
        placeholder={"Aa"}
        editorState={messageContent}
        setEditorState={setMessageContent}
      />
      <div className="px-2">
        <SendHorizontal
          className="text-primary cursor-pointer"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};
