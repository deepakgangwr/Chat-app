import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/60 backdrop-blur-lg border-b border-white/20 shadow-sm">
        <ChatHeader />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, idx) => (
          <div
            key={message._id}
            className={`flex items-start gap-3 animate-fadeIn ${
              message.senderId === authUser._id ? "justify-end" : "justify-start"
            }`}
            ref={idx === messages.length-1 ? messageEndRef : null}
          >
            {/* Avatar */}
            {message.senderId !== authUser._id && (
              <div className="h-10 w-10 rounded-full border-2 border-fuchsia-300 shadow-md overflow-hidden hover:scale-105 transition-transform">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-[70%] rounded-2xl px-10 py-0.0 shadow-md text-sm sm:text-base leading-relaxed ${
                message.senderId === authUser._id
                  ? "bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white rounded-br-none"
                  : "bg-white/80 backdrop-blur-md border border-gray-200 rounded-bl-none"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[220px] rounded-xl mb-2 shadow-sm"
                />
              )}
              {message.text && <p>{message.text}</p>}

              <div
                className={`text-[12px] mt-0 opacity-70 ${
                  message.senderId === authUser._id ? "text-gray-200" : "text-gray-500"
                }`}
              >
                {formatMessageTime(message.createdAt)}
              </div>
            </div>

            {/* Own Avatar */}
            {message.senderId === authUser._id && (
              <div className="h-10 w-10 rounded-full border-2 border-indigo-400 shadow-md overflow-hidden hover:scale-105 transition-transform">
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="sticky bottom-0 bg-white/70 backdrop-blur-md border-t border-white/20 shadow-lg p-2">
        <MessageInput />
      </div>
    </div>
  );
};
export default ChatContainer;
