"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus, Sparkles, AlertCircle } from 'lucide-react';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loadingAction, setLoadingAction] = useState(false);
  
  const { login, register, admin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (admin) {
      router.push('/dashboard');
    }
  }, [admin, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoadingAction(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 relative overflow-hidden">
        
        {/* Subtle decorative background shape inside card */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-2xl z-0 pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl z-0 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
              <span className="text-white font-bold text-2xl leading-none">S</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center justify-center gap-2">
              <Sparkles className="text-indigo-500 w-6 h-6 hidden sm:block" />
              SmartAttendence
            </h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              {isLogin 
                ? 'Sign in to access your dashboard' 
                : 'Create your administrator account'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-2">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all bg-gray-50 focus:bg-white"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all bg-gray-50 focus:bg-white"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loadingAction}
                className="w-full flex justify-center py-3.5 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loadingAction ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                    {isLogin ? 'Sign in' : 'Create account'}
                  </div>
                )}
              </button>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  className="font-bold text-blue-600 hover:text-blue-500 transition-colors bg-transparent border-none p-0 cursor-pointer"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Register now.' : 'Sign in instead.'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
