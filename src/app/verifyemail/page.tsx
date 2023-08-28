"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verify-email", { token });
      setVerified(true);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-3xl mb-5">Verify Email Page</h1>
      {verified && (
        <div>
          <h2 className="text-2xl mb-5">Email Verified</h2>
          <Link href={"/login"} className="text-xl mb-5">
            Go to Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl mb-5">Invalid Token. Sign In again</h2>
          <Link href={"/sign-in"} className="text-xl mb-5">
            Go to Sign-In
          </Link>
        </div>
      )}
    </main>
  );
}
