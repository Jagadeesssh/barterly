import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type LoginProps = {
  onClose?: () => void;
  onLogin?: (user: any) => void;
};

export default function Login({ onClose, onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (isRegister && !name)) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const payload = isRegister ? { name, email, password } : { email, password };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Success
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      
      toast.success(isRegister ? "Registration successful!" : "Welcome Back 👋");
      
      if (onLogin) onLogin(data);
      else if (onClose) onClose();

    } catch (err: any) {
      toast.error(err.message || 'Authentication failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl p-8 relative border border-slate-200 dark:border-slate-800">

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 items-center justify-center p-2 rounded-full dark:bg-slate-800 transition"
          >
            <X className="w-5 h-5"/>
          </button>
        )}

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4 text-2xl">
             {isRegister ? "✨" : "👋"}
          </div>
          <h2 className="text-3xl font-bold dark:text-white mb-2">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
             {isRegister ? "Join Barterly and start swapping!" : "Enter your details to access your account."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name - Only for Register */}
          {isRegister && (
            <div>
              <label className="block mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-colors dark:text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-colors dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              minLength={5}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-colors dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm tracking-wide flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Processing..." : isRegister ? "Create Account" : "Secure Login"}
          </button>
        </form>

        {/* Toggle Register/Login Link */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8 font-medium">
          {isRegister ? "Already registered?" : "Don't have an account?"}{" "}
          <span 
            className="text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline font-bold"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login here" : "Register now"}
          </span>
        </p>
      </div>
    </div>
  );
}
