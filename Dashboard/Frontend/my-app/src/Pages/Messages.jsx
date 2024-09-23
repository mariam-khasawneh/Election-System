import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Messages = () => {
  const [nationalIds, setNationalIds] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userMessages, setUserMessages] = useState([]);
  const [sendMessages, setSendMessages] = useState({
    Message: "",
    CN_Id: "",
  });

  const messagesEndRef = useRef(null);

  // Fetch National IDs
  useEffect(() => {
    const fetchNationalIds = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/national-Id");
        setNationalIds(response.data);
      } catch (error) {
        console.error("Error fetching national IDs:", error);
      }
    };

    fetchNationalIds();
  }, []);

  // Fetch Messages for all users
  useEffect(() => {
    const fetchMessages = async () => {
      const allMessages = [];
      for (const nationalIdObj of nationalIds) {
        const nationalId = nationalIdObj.CN_Id;
        try {
          const response = await axios.get(`http://localhost:3000/api/chat/${nationalId}`);
          allMessages.push({ nationalId, messages: response.data });
        } catch (error) {
          console.error(`Error fetching messages for ${nationalId}:`, error);
        }
      }
      setMessages(allMessages);
    };

    if (nationalIds.length > 0) {
      fetchMessages();
    }
  }, [nationalIds , userMessages]);

  // Fetch User Messages
  const fetchUserMessages = async (nationalId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/chat/${nationalId}`);
      const sortedMessages = response.data.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      setUserMessages(sortedMessages);
    } catch (error) {
      console.error(`Error fetching messages for ${nationalId}:`, error);
    }
  };

  // Handle User Click
  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchUserMessages(user.nationalId);
    setSendMessages((prev) => ({ ...prev, CN_Id: user.nationalId }));
  };

  // Add Message
  const AddMessage = async () => {
    try {
      await axios.post("http://localhost:3000/api/chat", sendMessages);
      setSendMessages({
        Message: "",
        CN_Id: selectedUser?.nationalId || "",
      });
      // Re-fetch messages to include the new one
      fetchUserMessages(selectedUser?.nationalId);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Scroll to bottom whenever userMessages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userMessages]);

  const [showSidebar, setShowSidebar] = useState(false);
  
  return (
    <div className="relative flex h-[90vh] bg-gray-200">
      {/* Sidebar */}
      <div
        className={`fixed z-40 top-0 left-0 w-full lg:w-1/4 bg-white border-r border-gray-300 flex flex-col transition-transform duration-300 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:w-1/4`}
      >
        <div className="p-4 bg-gray-100 border-b border-gray-300 flex items-center justify-between">
          <input
            type="text"
            placeholder="ابحث عن محادثة..."
            className="bg-gray-200 border-none rounded-full p-3 w-full focus:ring-2 focus:ring-green-500"
          />
         <button
        className="fixed z-30 top-4 left-4 lg:hidden bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition duration-300"
        onClick={() => setShowSidebar(prev => !prev)}
      >
        <i className={`fas ${showSidebar ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
      </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <h2 className="text-lg font-semibold p-4 text-gray-700">قائمة المحادثات</h2>
          <div className="space-y-2">
            {messages.length > 0 ? (
              messages.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-white hover:bg-green-50 cursor-pointer transition duration-200"
                  onClick={() => handleUserClick(user)}
                >
                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-gray-800">{user.messages[0]?.name}</span>
                    <span className="text-gray-500 text-sm truncate">
                      {user.messages[0]?.Message}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(user.messages[0]?.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">لا توجد رسائل حالياً.</div>
            )}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className="fixed z-30 top-4 left-4 lg:hidden bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition duration-300"
        onClick={() => setShowSidebar(prev => !prev)}
      >
        <i className={`fas ${showSidebar ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
      </button>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col bg-gray-50 ${showSidebar ? 'lg:ml-1/4' : 'ml-0'}`}>
        {selectedUser ? (
          <>
            <div className="flex items-center justify-between bg-white p-4 border-b border-gray-300">
              <div className="flex items-center">
                <div className="ml-3">
                  <span className="text-lg font-bold text-gray-800">
                    {selectedUser.messages[0]?.name}
                  </span>
                </div>
              </div>
              <button className="text-green-500 hover:text-green-600">
                <i className="fas fa-user-circle text-3xl"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {userMessages.length > 0 ? (
                userMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`relative flex ${
                      message.admin ? "justify-start" : "justify-end"
                    } mb-4`}
                  >
                    <div
                      className={`${
                        message.admin
                          ? "bg-[#AAFFCC] min-w-[80px] border border-gray-300"
                          : "bg-[#9EE6BB] text-gray-800"
                      } p-3 pb-4 rounded-lg shadow max-w-md relative`}
                    >
                      <span className="block">{message.Message}</span>
                      <span className="absolute bottom-0 right-2 text-gray-600 text-xs">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-6 text-gray-500">لا توجد رسائل لهذا المستخدم.</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-300 flex">
              <input
                type="text"
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 bg-gray-200 border-none rounded-full p-4 focus:ring-2 focus:ring-green-500"
                value={sendMessages.Message}
                onChange={(e) =>
                  setSendMessages({ ...sendMessages, Message: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    AddMessage();
                  }
                }}
              />
              <button
                className="bg-green-500 text-white rounded-full p-4 ml-4 shadow-lg hover:bg-green-600 transition duration-300"
                onClick={AddMessage}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            اختر مستخدمًا لعرض المحادثة.
          </div>
        )}
      </div>
    </div>
  );
  }
  


export default Messages;
