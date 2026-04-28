import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Utils/authContext";
import api from "../api/axiosInstance";
import { useLocalizedNavigate } from "../hooks/useLocalizedNavigate";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { user } = useContext(AuthContext);
  const localizedNavigate = useLocalizedNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      localizedNavigate("/", { replace: true });
    }
  }, [user, localizedNavigate]);

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users/", {
        name,
        email,
        password,
        avatar: "https://i.pravatar.cc/300"
      });

      toast.success("Account Created. Please log in.");
      
      // Navigate to login after registration
      localizedNavigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
      // More specific error handling
      const errorMessage = error.response?.data?.message || "Unable to Create Account";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold text-black">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={registerUser} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black">Full Name</label>
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md px-3 py-1.5 border outline-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Email address</label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md px-3 py-1.5 border outline-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md px-3 py-1.5 border outline-blue-500"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 font-semibold text-white hover:bg-indigo-400"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}