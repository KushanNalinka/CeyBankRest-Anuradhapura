
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


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-900">CeyBank Login</h2>
        <p className="text-center text-gray-600 mb-6">Welcome back to Rest Anuradhapura</p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {message && (
            <p className="text-red-600 text-center mb-4">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-900 transition"
          >
            Login
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
