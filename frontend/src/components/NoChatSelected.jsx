import { Bolt, MessageSquare, Users, ShieldCheck } from "lucide-react";

const FeatureCard = ({ icon, title, desc, color }) => (
  <div className="rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${color}`}>
        {icon}
      </div>
      <div>
        <div className="font-semibold text-slate-900 text-lg">{title}</div>
        <div className="text-sm text-slate-600">{desc}</div>
      </div>
    </div>
  </div>
);

const NoChatSelected = () => {
  return (
    <div className="relative w-full flex flex-1 flex-col items-center justify-center p-10 bg-gradient-to-b from-indigo-50 via-white to-fuchsia-50 overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle,black_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Gradient blobs */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center relative z-10">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-400 to-fuchsia-400 flex items-center justify-center shadow-lg">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl sm:text-10xl font-extrabold mt-100 tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm">
            Welcome to Connectly
          </h2>
          <p className="text-slate-600 mt-5 text-lg max-w-2xl mx-auto">
            Select a contact from the sidebar to start chatting. Your conversations will appear here with real-time updates and a premium chat experience.
          </p>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-12 relative z-10">
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6 text-white" />}
            title="Real-time Messaging"
            desc="Instant delivery with live updates"
            color="bg-gradient-to-tr from-emerald-400 to-emerald-600 text-white"
          />
          <FeatureCard
            icon={<Users className="w-6 h-6 text-white" />}
            title="Online Status"
            desc="See who's available to chat"
            color="bg-gradient-to-tr from-purple-400 to-purple-600 text-white"
          />
          <FeatureCard
            icon={<Bolt className="w-6 h-6 text-white" />}
            title="Lightning Fast"
            desc="Optimized for speed and performance"
            color="bg-gradient-to-tr from-orange-400 to-orange-600 text-white"
          />
          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6 text-white" />}
            title="Secure Chats"
            desc="End-to-end encrypted messages"
            color="bg-gradient-to-tr from-indigo-400 to-indigo-600 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
