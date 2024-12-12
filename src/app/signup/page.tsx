"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisable, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      // provide path

      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);

      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      //  react-hot-toast to more improve

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //more  checking here

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-3xl mb-10">
        {" "}
        {loading ? (
          <div className="flex items-center justify-center">
            {" "}
            <FaSpinner className="animate-spin mr-3" />
          </div>
        ) : (
          "Signup"
        )}
      </h2>
      <hr />

      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-800 rounded-md mb-4 focus:outline-none focus:border-red-800 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">Email</label>

      <input
        className=" p-2 border border-gray-800 rounded-md mb-4 focus:outline-none focus:border-red-800 text-black"
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
        onClick={onSignup}
        className="p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-red-800 "
      >
        {buttonDisable ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">Vist Login Page</Link>
    </div>
  );
}

export default SignupPage;
