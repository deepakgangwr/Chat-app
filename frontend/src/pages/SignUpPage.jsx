import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
	});

	const { signup, isSigningUp } = useAuthStore();

	const validateForm = () => {
		if (!formData.fullName.trim()) return toast.error("Full name is required");
		if (!formData.email.trim()) return toast.error("Email is required");
		if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
		if (!formData.password) return toast.error("Password is required");
		if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const success = validateForm();
		if (success === true) signup(formData);
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
								<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-2 text-gray-900">Create Account</h1>
								<p className="text-gray-600 mt-2">Get started with your free account</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="form-control">
									<label className="label">
										<span className="label-text font-medium text-gray-900">Full Name</span>
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<User className="size-5 text-black/40" />
										</div>
										<input
											type="text"
											className="w-full pl-10 h-12 rounded-xl bg-white border border-black/10 focus:border-black/20 outline-none placeholder-gray-500 text-gray-900"
											placeholder="John Doe"
											value={formData.fullName}
											onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
										/>
									</div>
								</div>

								<div className="form-control">
									<label className="label">
										<span className="label-text font-medium text-gray-900">Email Address</span>
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Mail className="size-5 text-black/40" />
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
											<Lock className="size-5 text-black/40" />
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
											{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
										</button>
									</div>
								</div>

								<button
									type="submit"
									className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-semibold shadow-lg hover:brightness-105 active:brightness-95 transition-all flex items-center justify-center gap-2"
									disabled={isSigningUp}
								>
									{isSigningUp ? (
										<>
											<Loader2 className="size-5 animate-spin" />
											Creating...
										</>
									) : (
										<>Create Account <span className="-mr-1">→</span></>
									)}
								</button>
							</form>

							<div className="text-center mt-6">
								<p className="text-gray-600">
									Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Sign in</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SignUpPage;
