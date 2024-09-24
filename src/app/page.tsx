"use client";
import { signIn } from "next-auth/react";

const Home = () => (
  // <main className="w-1/2 mx-auto mt-36">
  <main className="flex justify-center items-center min-h-screen bg-green-300">
    <button type="button" className="bg-sky-400 rounded-md px-4 py-2" onClick={() => signIn()}>
      Login
    </button>
  </main>
);

export default Home;
