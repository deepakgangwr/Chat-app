import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageCircle } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed w-full top-0 z-50 backdrop-blur-lg bg-white/30 border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-6 h-16">
        <div className="flex items-center justify-between h-full">
          
          {/* Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:opacity-90 transition-all"
          >
            <div className="size-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-md">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm">
              Connectly
            </h1>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {authUser && (
              <>
                <Link 
                  to={"/profile"} 
                  className="h-10 w-10 rounded-full overflow-hidden border-2 border-indigo-400 hover:scale-105 transition-transform shadow-md"
                >
                  <img 
                    src={authUser.profilePic || "/avatar.png"} 
                    alt="Profile" 
                    className="h-full w-full object-cover" 
                  />
                </Link>

                {/* Logout Icon */}
                <button
                  onClick={logout}
                  className="p-2 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white hover:opacity-90 transition-all shadow-md"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
