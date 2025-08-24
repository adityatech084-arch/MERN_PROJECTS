import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Eye, EyeOff } from 'lucide-react'; // For show/hide password icon
import leftImg from '../assets/Figure Message sent.json'
import { signup } from '../store/authSlice';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName:"",
    email: "",
    password: ""
  });

  const { isSingingIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(signup(formData)); // ← replace with your login action
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] grid grid-cols-1 md:grid-cols-2 bg-white">
  {/* Left Side (Lottie Animation) */}
  <div className="flex items-center justify-center p-4 sm:p-6 lg:p-10">
    <div className="w-full max-w-lg h-auto">
      <Lottie
        animationData={leftImg}
        loop={true}
        className="w-full h-full"
      />
    </div>
  </div>

  {/* Right Side (Register Form) */}
  <div className="flex items-center justify-center p-4 sm:p-6 lg:p-10">
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center sm:text-left">
        Welcome Back 👋
      </h2>
      <p className="text-sm text-gray-500 text-center sm:text-left">
        Login to your chat account
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            FullName
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSingingIn}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSingingIn ? "Creating in..." : "Create an Account"}
        </button>

        <p className="text-sm text-center text-gray-500">
          already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            login
          </Link>
        </p>
      </form>
    </div>
  </div>
</div>

  );
}

export default Register;
