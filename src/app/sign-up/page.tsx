"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      let response = await axios.post("/api/users/signup", user);
      console.log("Sign Up Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Sign Up Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-3xl mb-5">{loading ? "processing" : "Sign Up"}</h1>

      <input
        type="text"
        name="username"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="User Name"
        className="border-[3px] border-blue-400 p-2 rounded-xl mb-3"
      />

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

      <button onClick={onSignUp} className="bg-green-300 px-5 py-2 rounded-lg">
        {buttonDisabled ? "Fill all the fields" : "Submit"}
      </button>
      <Link href={"/login"} className="underline mt-3">
        Login Page
      </Link>
    </div>
  );
}
