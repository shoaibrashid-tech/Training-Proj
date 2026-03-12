import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Utils/authContext';
import getUserProfile from '../Utils/AuthUtils';
import api from '../api/axiosInstance';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext); // Removed 'user' as it's not needed for the login form
  
  const navigate = useNavigate();
  const location = useLocation();

  // Consolidated redirect logic
  const handleRedirect = () => {
    // Look for the "from" path passed by ProtectedRoute, default to "/"
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  };

  const sendLogin = async (e) => {
    e.preventDefault();

    // --- Hard Coded Admin ---
    if (email === "admin@admin.com" && password === "admin") {
      login({
        id: "admin",
        email: "admin@admin.com",
        name: "Admin Account",
        role: "admin",
      });
      localStorage.setItem("access_token", import.meta.env.VITE_ADMIN_TOKEN || "mock-token");
      handleRedirect(); // Redirect immediately after setting context
      return;
    }

    // --- API Login ---
    try {
      const response = await api.post(`/auth/login`, { email, password });
      
      if (response.data?.access_token) {
        Object.entries(response.data).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        
        const userData = await getUserProfile(response.data.access_token);
        login(userData);
        handleRedirect(); // Redirect immediately after setting context
      }
    } catch (error) {
      console.error(error.message);
      if (error.response?.status === 401) {
        toast.error("Incorrect Credentials");
      } else {
        toast.error(`Unable to Login: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold text-black">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={sendLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black">Email address</label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md px-3 py-1.5 text-black border outline-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md px-3 py-1.5 text-black border outline-blue-500"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-white hover:bg-indigo-400"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}