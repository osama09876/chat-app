import React, { useState } from "react";
import { useParams } from "react-router-dom";

const usersDummy = [
  { id: 1, name: "Ali" },
  { id: 2, name: "Ahmed" },
  { id: 3, name: "Sara" },
  { id: 4, name: "Zain" },
];

const ChatAppDasboard = () => {
  const { name } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">

      {/* SIDEBAR */}
      <div
        className={`
          ${selectedUser ? "hidden md:flex" : "flex"}
          w-full md:w-1/3 backdrop-blur-xl bg-white/5 border-r border-white/10 flex-col
        `}
      >
        {/* Profile */}
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
            {name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-semibold">{name}</h2>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>

        {/* Search */}
        <div className="p-3">
          <input
            type="text"
            placeholder="Search user..."
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 focus:outline-none text-sm"
          />
        </div>

        {/* Users */}
        <div className="flex-1 overflow-y-auto">
          {usersDummy.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition ${
                selectedUser?.id === user.id
                  ? "bg-indigo-600/30"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-medium">{user.name}</h3>
                <p className="text-xs text-gray-400">Last message...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div
        className={`
          ${selectedUser ? "flex" : "hidden md:flex"}
          w-full md:w-2/3 flex-col
        `}
      >
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="p-4 md:p-5 border-b border-white/10 flex items-center gap-3 bg-white/5 backdrop-blur-xl">
              
              {/* Back button (mobile only) */}
              <button
                onClick={() => setSelectedUser(null)}
                className="md:hidden text-white text-lg"
              >
                ←
              </button>

              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                {selectedUser.name.charAt(0)}
              </div>

              <div>
                <h2 className="font-semibold">{selectedUser.name}</h2>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
              <div className="flex items-start">
                <div className="bg-white/10 px-4 py-2 rounded-2xl max-w-[75%] md:max-w-xs">
                  Hey! How are you?
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-indigo-600 px-4 py-2 rounded-2xl max-w-[75%] md:max-w-xs">
                  I'm good! What about you?
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-3 md:p-4 border-t border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-2 md:gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/10 focus:outline-none text-sm"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 px-4 md:px-5 py-2 rounded-full text-sm font-medium transition">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="hidden md:flex items-center justify-center h-full text-gray-400 text-lg">
            Select a user to start chatting 💬
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAppDasboard;