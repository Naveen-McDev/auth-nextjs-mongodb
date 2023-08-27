"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      console.log("Logged Out Sucessfully");
      router.push("/login");
    } catch (error: any) {
      console.log("logout failed ", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response.data);
    setData(response.data.data.username);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-3xl mb-5">Profile</h1>
      <h2>
        {data === "nothing" ? (
          "Nothing Here"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <p>Profile Page</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={getUserDetails}>Get User Details</button>
    </div>
  );
}
