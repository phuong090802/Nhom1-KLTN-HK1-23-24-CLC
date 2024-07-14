import clsx from 'clsx';
import { MessageCircle } from 'lucide-react';
import { useCallback, useContext } from 'react';
import default_avatar from '../../assets/image/default_avatar.png';
import { DataContext } from '../../store';
import { AppLayoutContext } from './AppLayoutStore';

export const ConversationsButton = () => {
  const {
    showingModal,
    setShowingModal,
    conversations,
    setMessageBoxHidden,
    setSelectedConversation,
  } = useContext(AppLayoutContext);

  const { user, darkMode, newMessage, setNewMessage } = useContext(DataContext);

  const handleClick = useCallback(() => {
    if (showingModal === 'message') setShowingModal('');
    else {
      setShowingModal('message');
      setNewMessage(false);
    }
  }, [setShowingModal, showingModal]);

  const handleConversationClick = useCallback(
    (conversation) => {
      setMessageBoxHidden(false);
      setSelectedConversation(conversation);
      setShowingModal('');
    },
    [setMessageBoxHidden, setSelectedConversation, setShowingModal]
  );

  return (
    <div className="relative">
      <div
        className={clsx(
          'w-10 h-10 flex justify-center items-center rounded-full bg-black10 cursor-pointer',
          darkMode && 'bg-white/10'
        )}
      >
        <button className="cursor-pointer relative" onClick={handleClick}>
          <MessageCircle />
          {newMessage && (
            <span className="border-red-500 border-[4px] inline-block absolute rounded-full -top-0 right-[2px]" />
          )}
        </button>
      </div>
      <div
        className={clsx(
          'w-96 max-h-[80vh] border bg-white rounded-lg absolute z-10 -right-2 py-4 overflow-y-auto cursor-pointer',
          showingModal !== 'message' && 'hidden'
        )}
      >
        <h1 className="text-2xl font-bold text-black75 mb-4 px-4">Đoạn chat</h1>
        {conversations?.length !== 0 ? (
          conversations.map((conversation) => {
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
                    {conversation?.otherUser?.fullName || 'User Name'}
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
          })
        ) : (
          <div className="flex justify-center items-center pb-6 text-lg text-black50">
            Chưa có tin nhắn nào
          </div>
        )}
      </div>
    </div>
  );
};
