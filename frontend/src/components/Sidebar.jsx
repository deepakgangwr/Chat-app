import { useEffect, useMemo, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Mail, Search, Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = useMemo(() => {
    const base = showOnlineOnly ? users.filter((u) => onlineUsers.includes(u._id)) : users;
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();
    return base.filter((u) =>
      (u.fullName || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q)
    );
  }, [users, showOnlineOnly, onlineUsers, searchQuery]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-white/20 bg-white/60 backdrop-blur-2xl shadow-xl flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="border-b border-white/20 w-full p-5 bg-gradient-to-r from-indigo-50/80 to-fuchsia-50/80 backdrop-blur-md">
        <div className="hidden lg:flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Users className="size-6 text-indigo-600" />
              <span className="font-semibold text-slate-800 text-lg">Contacts</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {Math.max(onlineUsers.length - 1, 0)} online now
            </div>
          </div>
          <div className="text-xs px-3 py-1 rounded-full bg-white/70 border border-white/40 shadow-sm">
            {users.length} contacts
          </div>
        </div>

        {/* Search */}
        <div className="hidden lg:block mt-4">
          <label className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 border border-white/40 shadow-inner focus-within:ring-2 focus-within:ring-indigo-400 transition">
            <Search className="size-4 text-slate-500" />
            <input
              type="text"
              className="bg-transparent outline-none text-sm w-full placeholder-slate-400"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </div>

        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm rounded-full border-slate-300"
            />
            Show online only
          </label>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-4 px-2 space-y-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 
              ${selectedUser?._id === user._id 
                ? "bg-gradient-to-r from-indigo-100/90 to-fuchsia-100/90 ring-2 ring-indigo-200 shadow-md" 
                : "hover:bg-white/70 hover:shadow-sm"
              }`}
          >
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full border-2 border-white shadow-md"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </div>

            {/* User info */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium text-slate-800 truncate">{user.fullName}</div>
              <div className="text-xs text-slate-500 truncate flex items-center gap-1">
                <Mail className="size-3 text-slate-400" />
                <span className="truncate">{user.email || ""}</span>
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-slate-400 py-6">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
