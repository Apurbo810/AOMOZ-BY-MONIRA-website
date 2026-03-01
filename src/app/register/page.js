"use client";

import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const Register = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const [name, setName] = useState("");
  const [profileFile, setProfileFile] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateBangladeshiPhone = (phone) =>
    /^(?:\+8801|01)[3-9]\d{8}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name) return toast.error("Name is required"), setLoading(false);
    if (name.length < 3)
      return toast.error("Name must be at least 3 characters"), setLoading(false);

    if (!email) return toast.error("Email is required"), setLoading(false);
    const cleanEmail = email.trim().toLowerCase();

    if (!validateEmail(email))
      return toast.error("Invalid email"), setLoading(false);

    if (!phone) return toast.error("Phone number is required"), setLoading(false);
    if (!validateBangladeshiPhone(phone))
      return toast.error("Invalid Bangladeshi phone number"), setLoading(false);

    if (!address) return toast.error("Address is required"), setLoading(false);

    if (!password || !confirmPassword)
      return toast.error("Both password fields are required"), setLoading(false);

    if (password.length < 6)
      return toast.error("Password must be at least 6 characters"), setLoading(false);

    if (password !== confirmPassword)
      return toast.error("Passwords do not match"), setLoading(false);

    try {
      let profileImageUrl = "";

      if (profileFile) {
        const formData = new FormData();
        formData.append("file", profileFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok)
          throw new Error(uploadData.error || "Image upload failed");

        profileImageUrl = uploadData.url;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: cleanEmail,
          phone,
          address,
          password,
          profileImage: profileImageUrl,
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
    toast("Redirecting to Google...");
    signIn("google", { callbackUrl: "/" });
  };

  if (status === "loading")
    return <p className="text-center mt-10">Checking session...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] px-4 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[900px] h-[900px] bg-[var(--color-primary)]/10 blur-3xl rounded-full -top-40 left-1/2 -translate-x-1/2"></div>

      <Toaster position="top-center" />

      {/* Card */}
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-gray-200 relative z-10">

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-[var(--color-primary)] mb-8 tracking-wide">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                required
              />
            </div>

            {/* Profile image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Profile Picture
              </label>

              <input
                type="file"
                onChange={(e) => setProfileFile(e.target.files[0])}
                className="w-full text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                required
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none p-3"
                required
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                required
              />
            </div>

            {/* Confirm */}
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-11 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                required
              />
            </div>

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl text-white font-semibold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 border border-gray-300 rounded-xl py-3 flex justify-center items-center gap-3 hover:border-[var(--color-primary)]"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <p className="mt-6 text-center">
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