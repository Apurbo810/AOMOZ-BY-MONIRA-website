"use client";

import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
<<<<<<< HEAD

  const { data: session, status } = useSession();

=======
  const { data: session, status } = useSession();

  // Redirect if already logged in
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

=======
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
    setLoading(true);

    if (!email || !password) {
      toast.error("Both fields are required");
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      toast.success("Login successful!");
      setTimeout(() => router.push("/"), 1000);
    } else {
      toast.error("Invalid email or password");
    }

    setLoading(false);
  };

  const handleGoogleLogin = () => {
    toast("Redirecting to Google...");
    signIn("google", { callbackUrl: "/" });
  };

<<<<<<< HEAD
  if (status === "loading")
    return (
      <p className="text-center mt-10">
        Checking session...
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] px-4 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute w-[900px] h-[900px] bg-[var(--color-primary)]/10 blur-3xl rounded-full -top-40 left-1/2 -translate-x-1/2"></div>

      <Toaster position="top-center" />

      {/* Card */}
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-lg relative z-10 border border-gray-200">

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-[var(--color-primary)] mb-8 tracking-wide">
=======
  if (status === "loading") {
    return <p className="text-center mt-10">Checking session...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">

      {/* Soft Glow Background similar to hero */}
      <div className="absolute w-[900px] h-[900px] bg-red-500/10 blur-3xl rounded-full -top-40 left-1/2 -translate-x-1/2"></div>

      <Toaster position="top-center" />

      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-xl relative z-10 border border-red-200/40">
        <h2 className="text-4xl font-extrabold text-center text-red-600 mb-8 tracking-wide">
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

<<<<<<< HEAD
          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>

=======
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition"
=======
              placeholder="your@email.com"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none transition text-gray-800"
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
              required
            />
          </div>

<<<<<<< HEAD
          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Password
            </label>

=======
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition"
=======
              placeholder="••••••••"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none transition text-gray-800"
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
              required
            />
          </div>

<<<<<<< HEAD
          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white shadow-md transition ${
              loading
                ? "bg-gray-300 text-gray-600"
                : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
=======
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-300 ${
              loading ? "bg-red-300" : "bg-red-600 hover:bg-red-700 hover:shadow-lg active:scale-95"
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
<<<<<<< HEAD

        </form>

        {/* Divider */}
        <div className="my-5 text-center text-gray-500">
          or
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:border-[var(--color-primary)] transition font-semibold text-gray-700 bg-white"
        >
          <FcGoogle size={24} />
          Login with Google
        </button>

        {/* Register link */}
        <p className="mt-6 text-center text-gray-600">

          Don't have an account?{" "}

          <Link
            href="/register"
            className="text-[var(--color-accent)] font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

=======
        </form>

        <div className="my-5 text-center text-gray-500">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border rounded-xl py-3 hover:shadow-lg transition font-semibold text-gray-700 bg-white"
        >
          <FcGoogle size={24} /> Login with Google
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-red-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
