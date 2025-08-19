import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import { MessageCircle, Sparkles, Send, Users } from "lucide-react";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  const containerWidth = "max-w-6xl";

  return (
    <div className="relative h-screen bg-gradient-to-b from-[#f7faff] via-[#f3f6fb] to-[#eef2f7]">
      {/* soft gradient lights */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl"></div>

      <div className="flex items-center justify-center pt-20 px-4">
        <div className={`relative w-full ${containerWidth} h-[calc(100vh-8rem)] rounded-3xl bg-white/80 border border-slate-200/70 shadow-[0_10px_50px_-20px_rgba(0,0,0,0.25)] overflow-hidden` }>
          {/* corner decorations with brand icons */}
          <div className="pointer-events-none absolute top-3 left-3 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg">
            <MessageCircle className="w-6 h-6 text-white opacity-90" />
          </div>
          <div className="pointer-events-none absolute top-3 right-3 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow">
            <Sparkles className="w-5 h-5 text-white opacity-90" />
          </div>
          <div className="pointer-events-none absolute bottom-3 left-3 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-rose-500 shadow">
            <Users className="w-5 h-5 text-white opacity-90" />
          </div>
          <div className="pointer-events-none absolute bottom-3 right-3 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 shadow-lg">
            <Send className="w-6 h-6 text-white opacity-90" />
          </div>

          <div className="flex h-full">
            <Sidebar />
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
