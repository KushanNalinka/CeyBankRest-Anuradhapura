import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/ceybank-logo.jpeg';
import axios from 'axios';
import bgImage from '../../assets/images/ceybank-3.jpg';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    if (!validate()) return;
    try {
      const response = await axios.post('/api/login', { email, password });
      
      if (response.data.success) { 
        setMessage('Login successful! Redirecting...');
      
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(response.data.message || 'Login failed');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Server error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Right Form Section with gradient background */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-blue-300 to-blue-100">   
        <div className="w-full max-w-md bg-white bg-opacity-80 rounded-2xl shadow-2xl p-8 backdrop-filter backdrop-blur-sm">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="CeyBank Logo" className="w-36 h-auto" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">
            Signin to Your Account
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Welcome back to Rest Anuradhapura
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@ceybank.lk"
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition transition ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
                 {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                    value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />

          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

{message && (
              <p className={`mb-4 text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 mb-4 text-white font-medium rounded-lg bg-yellow-500 hover:bg-yellow-600 transition"
            >
              Login
            </button>
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-yellow-600 hover:text-yellow-700 font-medium">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from '../../assets/images/ceybank-logo.jpeg';
// import axios from 'axios';
// import bgImage from '../../assets/images/ceybank-login.jpeg';

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState('');

//   const validate = () => {
//     const newErrors = {};
//     if (!email) newErrors.email = 'Email is required';
//     if (!password) newErrors.password = 'Password is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setMessage('');
//     if (!validate()) return;
//     try {
//       const response = await axios.post('/api/login', { email, password });
      
//       if (response.data.success) { //response.data.success
//         setMessage('Login successful! Redirecting...');
      
//         setTimeout(() => navigate('/dashboard'), 1000);
//       } else {
//         setMessage(response.data.message || 'Login failed');//response.data.message || 
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Server error. Please try again.');//err.response?.data?.message ||
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
//       style={{
//         backgroundImage: ` url(${bgImage})`,
      
//       }}
//     >
//       {/* Form Wrapper*/}
//       <div className="relative w-full max-w-4xl linear-gradient(to right, rgba(250,204,21,0.6), rgba(254,243,199,0.6)),bg-yellow-50 bg-opacity-40 rounded-2xl shadow-xl backdrop-filter backdrop-blur-sm overflow-hidden flex flex-col md:flex-row min-h-[550px] z-10">
//         {/* Left side*/}
//          <div className="w-full md:w-1/2 bg-white p-12 flex flex-col items-center justify-center">
//           <img src={logo} alt="CeyBank Logo" className="w-32 h-auto mb-8" />
//           <h2 className="text-3xl font-extrabold text-blue-900 mb-2">Welcome Back!</h2>
//           <p className="text-center text-gray-700">Rest Anuradhapura Booking Portal</p>
//         </div>

       
//         {/* Right side*/}
//         <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
//           <h3 className="text-2xl font-semibold text-gray-400 mb-8 text-center md:text-left">
//             Sign in to Your Account
//           </h3>
//           <form onSubmit={handleSubmit} noValidate>
//             <div className="mb-6">
//               <label htmlFor="email" className="block text-gray-300 mb-2">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//                 placeholder="you@ceybank.lk"
//                 className={`w-full p-3 bg-yellow-100 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition transition ${
//                   errors.email ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//             </div>

//             <div className="mb-8">
//               <label htmlFor="password" className="block text-gray-300 mb-2">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                  value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className={`w-full p-3 bg-yellow-100 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ${
//                   errors.password ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//                   {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
//             </div>

//             {message && (
//               <p className={`mb-4 text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
//             )}

//             <button
//               type="submit"
//               className="w-full py-3 mb-4 text-white font-semibold rounded-lg bg-yellow-500 hover:bg-yellow-600 transition"
//             >
//               Login
//             </button>

//             <p className="text- text-center text-gray-300">
//               Don't have an account?{' '}
//               <Link to="/signup" className="font-medium text-yellow-600 hover:text-yellow-700">
//                 Sign Up
//               </Link>
//             </p>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Login;