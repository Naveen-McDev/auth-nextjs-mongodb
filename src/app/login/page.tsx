"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successfull", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Failed to Sign In", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-3xl mb-5">{loading ? "Processing" : "Login"}</h1>

      <input
        type="email"
        name="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="User Email"
        className="border-[3px] border-blue-400 p-2 rounded-xl mb-3"
      />

      <input
        type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="User Password"
        className="border-[3px] border-blue-400 p-2 rounded-xl mb-3"
      />

      <button onClick={onSignIn} className="bg-green-300 px-5 py-2 rounded-lg">
        {buttonDisabled ? "Fill all the fields" : "Submit"}
      </button>
      <Link href={"/sign-up"} className="underline mt-3">
        Sign Up Page
      </Link>
    </div>
  );
}
