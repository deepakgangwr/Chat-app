import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { login, isLoggingIn } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		login(formData);
	};

	return (
		<div className="relative min-h-screen overflow-hidden text-gray-900">
			{/* Full-screen split background */}
			<div className="absolute inset-0 grid md:grid-cols-2">
				<div className="bg-gradient-to-b from-[#f7f7f7] to-[#f3e7c6]" />
				<div className="relative">
					<img
						src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1600&auto=format&fit=crop"
						alt="Workspace"
						className="absolute inset-0 h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
				</div>
			</div>

			

			{/* Card with gradient border and glow, left column */}
			<div className="relative z-10 max-w-xl w-full mx-auto md:mx-0 md:ml-[6%] md:col-span-1 flex items-center min-h-screen">
				<div className="w-full">
					<div className="rounded-3xl p-[2px] bg-gradient-to-b from-black/10 via-black/5 to-black/0 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.4)]">
						<div className="rounded-3xl bg-white border border-black/10 p-8 md:p-10">
							{/* Brand first, then form title */}
							<div className="text-center mb-8">
								<div className="relative w-16 h-16 mx-auto">
									<div className="absolute -top-1 -right-1 size-4 rounded-full bg-amber-400 shadow-md"></div>
									<div className="w-full h-full rounded-2xl bg-gradient-to-b from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
										<MessageSquare className="w-8 h-8 text-white" />
									</div>
								</div>
								<div className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Connectly</div>
								<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-2 text-gray-900">Welcome Back</h1>
								<p className="text-gray-600 mt-2">Sign in to continue your journey</p>
							</div>

							{/* Form */}
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="form-control">
									<label className="label">
										<span className="label-text font-medium text-gray-900">Email Address</span>
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Mail className="h-5 w-5 text-black/40" />
										</div>
										<input
											type="email"
											className="w-full pl-10 h-12 rounded-xl bg-white border border-black/10 focus:border-black/20 outline-none placeholder-gray-500 text-gray-900"
											placeholder="you@example.com"
											value={formData.email}
											onChange={(e) => setFormData({ ...formData, email: e.target.value })}
										/>
									</div>
								</div>

								<div className="form-control">
									<label className="label">
										<span className="label-text font-medium text-gray-900">Password</span>
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Lock className="h-5 w-5 text-black/40" />
										</div>
										<input
											type={showPassword ? "text" : "password"}
											className="w-full pl-10 pr-10 h-12 rounded-xl bg-white border border-black/10 focus:border-black/20 outline-none placeholder-gray-500 text-gray-900"
											placeholder="••••••••"
											value={formData.password}
											onChange={(e) => setFormData({ ...formData, password: e.target.value })}
										/>
										<button
											type="button"
											className="absolute inset-y-0 right-0 pr-3 flex items-center text-black/50 hover:text-black"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
										</button>
									</div>
								</div>

								<button
									type="submit"
									className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-semibold shadow-lg hover:brightness-105 active:brightness-95 transition-all flex items-center justify-center gap-2"
									disabled={isLoggingIn}
								>
									{isLoggingIn ? (
										<>
											<Loader2 className="h-5 w-5 animate-spin" />
											Signing in...
										</>
									) : (
										<>
											<span>Sign in</span>
											<span className="-mr-1">→</span>
										</>
									)}
								</button>
							</form>

							<div className="text-center mt-6">
								<p className="text-gray-600">
									Don&apos;t have an account? {" "}
									<Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
										Create account
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
