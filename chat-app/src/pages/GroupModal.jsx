import React, { useState } from "react";

const CreateGroupModal = ({ isOpen, onClose, users = [], onCreate }) => {
  const [name, setName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const toggleMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    onCreate({
      name,
      members: selectedMembers,
    });

    setName("");
    setSelectedMembers([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-5">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Create Group</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Group Name */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Group Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter group name"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Users List */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Select Members</label>

          <div className="mt-2 max-h-48 overflow-y-auto space-y-2">
            {users.map((u) => (
              <div
                key={u.id}
                onClick={() => toggleMember(u.id)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border ${
                  selectedMembers.includes(u.id)
                    ? "bg-indigo-100 border-indigo-400"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="text-sm">{u.username || u.name}</span>

                <input
                  type="checkbox"
                  checked={selectedMembers.includes(u.id)}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-red-400 hover:bg-red-500"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
