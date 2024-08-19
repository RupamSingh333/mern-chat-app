import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";  // Importing close icon
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {

  const { selectedConversation, setSelectedConversation, isUserOnline, setIsUserOnline } = useConversation();
  const { onlineUsers } = useSocketContext();


  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  useEffect(() => {
    // cleanup function (unmounts)
    if (selectedConversation) {
      const isOnline = onlineUsers.includes(selectedConversation._id);
      setIsUserOnline(isOnline);
    }

  }, [selectedConversation]);

  const closeConversation = () => {
    setSelectedConversation(null);
  };

  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className='bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center'>
            <div>
              <span className='label-text'>To:</span>{" "}
              <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: isUserOnline ? "green" : "red",
                  marginLeft: "8px",
                }}
                title={isUserOnline ? "Online" : "Offline"}
              ></span>
            </div>
            <FaTimes
              className='text-white cursor-pointer'
              onClick={closeConversation}  // Handle close icon click
            />
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
};
