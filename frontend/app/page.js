"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus, Sparkles, BrainCircuit } from 'lucide-react';

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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Column: Visual/Illustration (Hidden on smaller screens) */}
      <div className="hidden lg:flex flex-col justify-between bg-gray-900 border-r border-gray-100 relative overflow-hidden p-12 lg:p-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_rgba(59,130,246,0.15),_transparent_50%)] z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_rgba(99,102,241,0.15),_transparent_50%)] z-0 pointer-events-none"></div>
        
        <div className="z-10 relative">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-xl leading-none">S</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent tracking-wide">
              SmartAttendence
            </h1>
          </div>
          
          <div className="space-y-6 max-w-lg mt-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <Sparkles size={16} />
              <span>Next-Gen Education Platform</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              AI-Powered Classroom Analytics
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Automate attendance, eliminate manual roll calls, and gain insights into classroom participation using advanced object detection and facial counting technology integrated seamlessly.
            </p>
          </div>
        </div>

        <div className="z-10 relative mt-auto flex items-center gap-4 text-gray-400 p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
           <BrainCircuit size={40} className="text-blue-500" />
           <div>
             <h4 className="font-semibold text-gray-200">Powered by TensorFlow</h4>
             <p className="text-sm mt-1">Real-time inference running securely on your machine.</p>
           </div>
        </div>
      </div>

      {/* Right Column: Auth Form */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12 relative">
        <div className="max-w-md w-full mx-auto space-y-8">
          
          {/* Mobile Logo Header */}
          <div className="lg:hidden text-center flex flex-col items-center">
             <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
              <span className="text-white font-bold text-2xl leading-none">S</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              SmartAttendence
            </h2>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {isLogin 
                ? 'Sign in to access your dashboard and manage captures' 
                : 'Enter your details to register as a new administrator'}
            </p>
          </div>

          <form className="mt-8 space-y-6 bg-white p-2" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-3 transition-all">
                <div className="mt-0.5"><Sparkles size={16} className="text-red-500" /></div>
                {error}
              </div>
            )}
            
            <div className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all focus:bg-white bg-gray-50"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all focus:bg-white bg-gray-50"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all focus:bg-white bg-gray-50"
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
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
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
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Register now' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
