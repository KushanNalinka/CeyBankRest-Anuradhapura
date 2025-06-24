
// import { Link } from 'react-router-dom';

// function Login() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-100">
//       <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-blue-900">CeyBank Login</h2>
//         <p className="text-center text-gray-600 mb-6">Welcome back to Rest Anuradhapura</p>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Email</label>
//             <input type="email" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@ceybank.lk" />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 mb-2">Password</label>
//             <input type="password" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
//           </div>
//           <button className="w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-900 transition">Login</button>
//           <p className="text-sm text-center mt-4 text-gray-600">
//             Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;


// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';

// function Login() {
//    const API_URL = process.env.REACT_APP_API_URL;  // build-time constant
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${API_URL}/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       // Check if response is successful
//       if (!response.ok) {
//         throw new Error('Login failed. Please check your credentials.');
//       }

//       // Check if response has content
//       const text = await response.text();
//       const data = text ? JSON.parse(text) : {};

//       if (!data.token) {
//         throw new Error('Token not received from server');
//       }

//       const decoded = jwtDecode(data.token);

//       sessionStorage.setItem('token', data.token);
//       sessionStorage.setItem('username', decoded.sub);
//       sessionStorage.setItem('role', decoded.roles?.[0] || 'UNKNOWN');

//       navigate('/home'); // redirect after login
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-100">
//       <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-blue-900">CeyBank Login</h2>
//         <p className="text-center text-gray-600 mb-6">Welcome back to Rest Anuradhapura</p>

//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="john"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           {message && (
//             <p className="text-red-600 text-center mb-4">{message}</p>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-900 transition"
//           >
//             Login
//           </button>

//           <p className="text-sm text-center mt-4 text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const API_URL = process.env.REACT_APP_API_URL;  // build-time constant
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Check if response is successful
      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      // Check if response has content
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!data.token) {
        throw new Error('Token not received from server');
      }

      const decoded = jwtDecode(data.token);

      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('username', decoded.sub);
      sessionStorage.setItem('role', decoded.roles?.[0] || 'UNKNOWN');

      navigate('/home'); // redirect after login
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-12 animate-pulse animation-delay-4000"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-10 right-10 w-20 h-20 border border-blue-300/40 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-yellow-400/30 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-blue-400/20 rotate-45 animate-pulse"></div>
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-twinkle opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Glassmorphism Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl transform transition-all duration-500 hover:scale-105"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
              {/* Bank of Ceylon Logo */}
              <div className="relative w-20 h-20">
                {/* Outer yellow circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full border-4 border-black"></div>
                
                {/* Inner black circle */}
                <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                  {/* Lion symbol */}
                  <div className="text-yellow-400 text-xs font-bold flex flex-col items-center">
                    <div className="w-6 h-4 mb-1">
                      {/* Simplified lion shape */}
                      <svg viewBox="0 0 24 16" className="w-full h-full fill-current">
                        <path d="M12 2c-2 0-4 1-4 3v2c0 1 1 2 2 2h4c1 0 2-1 2-2V5c0-2-2-3-4-3z"/>
                        <path d="M8 8v4c0 1 1 2 2 2h4c1 0 2-1 2-2V8"/>
                        <circle cx="10" cy="4" r="0.5"/>
                        <circle cx="14" cy="4" r="0.5"/>
                        <path d="M9 6h6" stroke="currentColor" strokeWidth="0.5"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Text around the circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute top-1 text-black text-xs font-bold transform -rotate-12">
                    <span style={{fontSize: '6px'}}>ලංකා</span>
                  </div>
                  <div className="absolute top-1 right-2 text-black text-xs font-bold transform rotate-12">
                    <span style={{fontSize: '6px'}}>බැංකුව</span>
                  </div>
                  <div className="absolute bottom-1 text-black text-xs font-bold">
                    <span style={{fontSize: '5px'}}>BANK OF CEYLON</span>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm font-medium">
              CeyBank • Rest Anuradhapura
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="group">
              <label className="block text-gray-700 text-sm font-medium mb-2 transition-colors group-focus-within:text-blue-600">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  placeholder="Enter your username"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-yellow-400/0 group-focus-within:from-blue-400/5 group-focus-within:to-yellow-400/5 pointer-events-none transition-all duration-300"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-gray-700 text-sm font-medium mb-2 transition-colors group-focus-within:text-blue-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-white/70 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878l4.242 4.242m0 0L15.536 15.536M14.12 14.12l4.243 4.243" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    )}
                  </svg>
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-yellow-400/0 group-focus-within:from-blue-400/5 group-focus-within:to-yellow-400/5 pointer-events-none transition-all duration-300"></div>
              </div>
            </div>

            {/* Error Message */}
            {message && (
              <div className={`p-3 border rounded-xl backdrop-blur-sm animate-shake ${
                message.includes('successful') || message.includes('Redirecting')
                  ? 'bg-green-500/20 border-green-500/30' 
                  : 'bg-red-500/20 border-red-500/30'
              }`}>
                <p className={`text-sm text-center font-medium ${
                  message.includes('successful') || message.includes('Redirecting') ? 'text-green-700' : 'text-red-700'
                }`}>
                  {message}
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-800 font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className={`transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                Login
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-gray-800/30 border-t-gray-800 rounded-full animate-spin"></div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform skew-x-12 -translate-x-full transition-transform duration-1000 hover:translate-x-full"></div>
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline decoration-2 underline-offset-2"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-40 animate-float"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-30 animate-float-delayed"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-180deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Login;