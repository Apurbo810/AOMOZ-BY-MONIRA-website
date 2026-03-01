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
<<<<<<< HEAD
    if (name.length < 3)
      return toast.error("Name must be at least 3 characters"), setLoading(false);

    if (!email) return toast.error("Email is required"), setLoading(false);
    const cleanEmail = email.trim().toLowerCase();

    if (!validateEmail(email))
      return toast.error("Invalid email"), setLoading(false);
=======
    if (name.length < 3) return toast.error("Name must be at least 3 characters"), setLoading(false);

    if (!email) return toast.error("Email is required"), setLoading(false);
    const cleanEmail = email.trim().toLowerCase();
    
    if (!validateEmail(email)) return toast.error("Invalid email"), setLoading(false);
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3

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
<<<<<<< HEAD

      if (profileFile) {
=======
      if (profileFile) {
        if (!profileFile.type.startsWith("image/"))
          throw new Error("Profile picture must be an image");

        if (profileFile.size > 2 * 1024 * 1024)
          throw new Error("Image size must be under 2MB");

>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
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
<<<<<<< HEAD
=======
        
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      toast.success("Registration successful!");
      setTimeout(() => router.push("/login"), 1500);
<<<<<<< HEAD

=======
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
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
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] px-4 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[900px] h-[900px] bg-[var(--color-primary)]/10 blur-3xl rounded-full -top-40 left-1/2 -translate-x-1/2"></div>

      <Toaster position="top-center" />

      {/* Card */}
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-gray-200 relative z-10">

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-[var(--color-primary)] mb-8 tracking-wide">
=======
    <div className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">
      <div className="absolute w-[900px] h-[900px] bg-red-500/10 blur-3xl rounded-full -top-40 left-1/2 -translate-x-1/2"></div>

      <Toaster position="top-center" />

      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-red-200/40 relative z-10">
        <h2 className="text-4xl font-extrabold text-center text-red-600 mb-8 tracking-wide">
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

<<<<<<< HEAD
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

=======
{/* Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Name */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Name
    </label>
    <input
      type="text"
      minLength={3}
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Your full name"
      className="w-full h-11 px-3 text-sm border rounded-xl
file:mr-3 file:py-1.5 file:px-3
file:text-sm file:rounded-lg file:border-0
file:bg-red-50 file:text-red-600
hover:file:bg-red-100 cursor-pointer"
      required
    />
  </div>

  {/* Profile Picture */}
  <div>
  <label className="block text-sm font-semibold text-gray-700 mb-1">
    Profile Picture
  </label>

  <div className="flex items-center gap-3">
    {/* Hidden real input */}
    <input
      type="file"
      accept="image/*"
      id="profileImage"
      onChange={(e) => setProfileFile(e.target.files[0])}
      className="hidden"
    />

    {/* Custom button */}
    <label
      htmlFor="profileImage"
      className="px-4 py-2 text-sm font-medium text-red-600
      bg-red-50 border border-red-300 rounded-lg
      cursor-pointer hover:bg-red-100 transition"
    >
      Choose File
    </label>

    {/* File name */}
    <span className="text-sm text-gray-600 truncate max-w-[180px]">
      {profileFile ? profileFile.name : "No file chosen"}
    </span>
  </div>
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
      placeholder="you@example.com"
      className="w-full h-11 px-3 text-sm border rounded-xl"
      required
    />
  </div>

  {/* Phone */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Phone (BD)
    </label>
        <input
      type="tel"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      placeholder="+8801XXXXXXXXX"
      className="w-full h-11 px-3 text-sm border rounded-xl"
      required
    />

  </div>

  {/* Address – full width */}
  <div className="md:col-span-2">
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Address
    </label>
    <textarea
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      placeholder="Your full address"
      rows={3}
      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none resize-none"
      required
    />
  </div>

  {/* Password */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Password
    </label>
    <input
      type="password"
      minLength={6}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="••••••••"
      className="w-full h-12 px-4 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
      required
    />
  </div>

  {/* Confirm Password */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Confirm Password
    </label>
    <input
      type="password"
      minLength={6}
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="••••••••"
      className="w-full h-12 px-4 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
      required
    />
  </div>

</div>

{/* Submit */}
<button
  type="submit"
  disabled={loading}
  className={`w-full h-12 rounded-xl text-white font-semibold transition ${
    loading
      ? "bg-red-300"
      : "bg-red-600 hover:bg-red-700 active:scale-[0.98]"
  }`}
>
  {loading ? "Registering..." : "Register"}
</button>
</form>

        <div className="my-5 text-center text-gray-500">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border rounded-xl py-3 font-semibold text-gray-700 bg-white"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-red-600 font-semibold">
            Login
          </Link>
        </p>
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Register;
=======
export default Register;
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
