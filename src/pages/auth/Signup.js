import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/images/ceybank-logo.jpeg';
import bgImage from '../../assets/images/ceybank-4.jpeg';

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = 'Full name is required';
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
      const response = await axios.post('/api/signup', { fullName, email, password });
      if (response.data.success) {
        setMessage('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage(response.data.message || 'Signup failed');
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

      {/* Right Form Section with new gradient background */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-blue-300 to-blue-100">
        <div className="w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 backdrop-filter backdrop-blur-sm">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img src={logo} alt="CeyBank Logo" className="w-32 h-auto" />
          </div>

          <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">CeyBank Sign Up</h2>
          <p className="text-center text-gray-600 mb-6">Create your account for Rest Anuradhapura</p>

          {message && (
            <p className={`mb-4 text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="John Doe"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@ceybank.lk"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 mb-4 text-white font-medium rounded-lg bg-yellow-500 hover:bg-yellow-600 transition"
            >
              Sign Up
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/" className="text-yellow-600 hover:text-yellow-700 font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;