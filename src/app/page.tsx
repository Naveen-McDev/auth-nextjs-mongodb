import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <h1>Next JS Authentication</h1>
      <Link href="/sign-up">Go to Sign Up page</Link>
    </main>
  );
}
