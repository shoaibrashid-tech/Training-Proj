import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    if(user){
        navigate("/")
    }
  const RegisterUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          avatar: "https://i.pravatar.cc/300"
        }),
      });

      if (!response.ok) {
        throw new Error(`Http Response: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      navigate("/login");

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold text-black">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        <form onSubmit={RegisterUser} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-black">
              Full Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                required
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md px-3 py-1.5 text-black outline outline-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md px-3 py-1.5 text-black outline outline-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md px-3 py-1.5 text-black outline outline-blue-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 font-semibold text-white hover:bg-indigo-400"
            >
              Register
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}