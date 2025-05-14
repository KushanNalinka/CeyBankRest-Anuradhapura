
// import { Link } from 'react-router-dom';

// function Signup() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  from-yellow-400 to-yellow-100">
//       <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-blue-900">CeyBank Sign Up</h2>
//         <p className="text-center text-gray-600 mb-6">Create your account for Rest Anuradhapura</p>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Full Name</label>
//             <input type="text" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Email</label>
//             <input type="email" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@ceybank.lk" />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 mb-2">Password</label>
//             <input type="password" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
//           </div>
//           <button className="w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-900 transition">Sign Up</button>
//           <p className="text-sm text-center mt-4 text-gray-600">
//             Already have an account? <Link to="/" className="text-blue-600 hover:underline">Login</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const API_URL = process.env.REACT_APP_API_URL;  // build-time constant
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const roles = [
    'ROLE_CHEF',
    'ROLE_GUEST_REGISTER',
    'ROLE_MANAGER',
    'ROLE_STORE_KEEPER'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const payload = {
      username,
      password,
      roles: [role],
    };

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      setMessage('Registration successful!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-900">CeyBank Sign Up</h2>
        <p className="text-center text-gray-600 mb-6">Create your account for Rest Anuradhapura</p>

        <form onSubmit={handleSubmit}>
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

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {message && <p className="text-red-600 text-center mb-4">{message}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-900 transition"
          >
            Sign Up
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
