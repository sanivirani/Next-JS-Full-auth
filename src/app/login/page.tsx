"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login succees", response.data);
      toast.success("Login success");

      router.push("/profile");
    } catch (error: any) {
      console.log("Login falied", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="mb-4">
        {" "}
        {loading ? (
          <div className="flex items-center justify-center">
            {" "}
            <FaSpinner className="animate-ping mr-3" />
          </div>
        ) : (
          "Login"
        )}
      </h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-800 rounded-md mb-4 focus:outline-none focus:border-red-800 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-800 rounded-md mb-4 focus:outline-none focus:border-red-800 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-red-800"
      >
        Login
      </button>
      <Link href="/signup">Visit Signup Page</Link>
    </div>
  );
}

export default LoginPage;
