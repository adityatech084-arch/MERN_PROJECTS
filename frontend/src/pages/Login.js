import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import { Eye, EyeOff } from 'lucide-react'; // For show/hide password icon
import {Link} from 'react-router-dom';
import leftImg from '../assets/Figure Message sent.json'
import { login } from '../store/authSlice';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { isLoggingIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(formData)); // ← replace with your login action
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] grid grid-cols-1 md:grid-cols-2 bg-white">
  {/* Left Side (Lottie Animation) */}
  <div className="flex items-center justify-center p-4">
    <div className="w-full max-w-lg h-auto">
      <Lottie animationData={leftImg} loop={true} className="w-full h-full" />
    </div>
  </div>  

  {/* Right Side (Login Form) */}
  <div className="flex items-center justify-center p-6">
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h2>
      <p className="text-sm text-gray-500">Login to your chat account</p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
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
          <label className="block text-sm font-medium text-gray-700">Password</label>
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
          disabled={isLoggingIn}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  </div>
</div>

  );
}

export default Login;
