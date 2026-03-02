"use client";

import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const Register = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateBangladeshiPhone = (phone) =>
    /^(?:\+8801|01)[3-9]\d{8}$/.test(phone);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, phone, address, password, confirmPassword } = form;

    if (!name || name.length < 3)
      return toast.error("Enter a valid name"), setLoading(false);

    if (!validateEmail(email))
      return toast.error("Invalid email"), setLoading(false);

    if (!validateBangladeshiPhone(phone))
      return toast.error("Invalid Bangladeshi phone"), setLoading(false);

    if (!address)
      return toast.error("Address is required"), setLoading(false);

    if (password.length < 6)
      return toast.error("Password must be at least 6 characters"), setLoading(false);

    if (password !== confirmPassword)
      return toast.error("Passwords do not match"), setLoading(false);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: email.trim().toLowerCase(),
          phone,
          address,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      toast.success("Registration successful!");
      setTimeout(() => router.push("/login"), 1500);

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  if (status === "loading")
    return <p className="text-center mt-10">Checking session...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] px-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[900px] h-[900px] bg-[var(--color-primary)]/10 blur-3xl rounded-full -top-40 left-1/2 -translate-x-1/2"></div>

      <Toaster position="top-center" />

      {/* Card */}
      <div className="max-w-lg w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-200 relative z-10">

        <h2 className="text-3xl font-bold text-center text-[var(--color-primary)] mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition"
              placeholder="01XXXXXXXXX"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="3"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition resize-none"
              placeholder="Enter your full address"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition"
              placeholder="Minimum 6 characters"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition"
              placeholder="Re-enter password"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-hover)] transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        {/* Divider */}
        <div className="divider my-6">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 rounded-xl py-3 flex justify-center items-center gap-3 hover:border-[var(--color-primary)] transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--color-accent)] font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;