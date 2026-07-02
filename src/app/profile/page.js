"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");

    if (session?.user) {
      setUser(session.user);
      setName(session.user.name || "");
      setPhone(session.user.phone || "");
      setAddress(session.user.address || "");
      setIsAdmin(session.user.admin || false);
    }
  }, [status, session, router]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/"))
      return toast.error("Only images allowed");

    if (selectedFile.size > 1 * 1024 * 1024)
      return toast.error("Max size 1MB");

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Select an image");

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error);

      const updateForm = new FormData();
      updateForm.append("profileImage", uploadData.url);

      const updateRes = await fetch(
        "/api/user/updateProfileImage",
        {
          method: "POST",
          body: updateForm,
        }
      );

      const updateData = await updateRes.json();
      if (!updateRes.ok) throw new Error(updateData.message);

      setUser(updateData.user);

      toast.success("Photo updated!");

      if (update) await update({ user: updateData.user });

      setPreview(null);
      setFile(null);
      setFileName("");

    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveDetails = async () => {
    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("address", address);

      const res = await fetch(
        "/api/user/updateProfileImage",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setUser(data.user);

      toast.success("Profile updated!");

      if (update) await update({ user: data.user });

    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading")
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] px-4 py-12 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[900px] h-[900px] bg-[var(--color-primary)]/10 blur-3xl rounded-full left-1/2 -translate-x-1/2 -top-40"></div>

      <Toaster position="top-center" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 relative z-10">

        {/* Profile Card */}
        <div className="flex-1 bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-gray-200">

          <h1 className="text-4xl font-extrabold text-[var(--color-primary)] mb-8 text-center">
            My Profile
          </h1>

          <div className="flex flex-col items-center">

            <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden shadow-lg ring-4 ring-[var(--color-primary)]/20">
              {preview ? (
                <Image src={preview} fill className="object-cover" alt="Preview" />
              ) : user?.profileImage ? (
                <Image src={user.profileImage} fill className="object-cover" alt="Profile" />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-400" />
              )}
            </div>

            {/* Choose button */}
            <label className="mt-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold px-6 py-2 rounded-xl shadow-md cursor-pointer transition">
              Choose Image
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>

            {fileName && (
              <p className="mt-2 text-gray-600 text-sm italic">
                {fileName}
              </p>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`mt-3 px-6 py-2 rounded-xl font-semibold shadow-md transition ${
                uploading
                  ? "bg-gray-300 text-gray-600"
                  : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
              }`}
            >
              {uploading ? "Uploading..." : "Update Photo"}
            </button>

          </div>

          {/* Form */}
          <div className="mt-10 space-y-5">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
            />

            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
            />

            <p>
              <b>Email:</b>{" "}
              <span className="text-[var(--color-accent)]">
                {user?.email}
              </span>
            </p>

            <button
              onClick={handleSaveDetails}
              disabled={saving}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                saving
                  ? "bg-gray-300 text-gray-600"
                  : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>
        </div>

        {/* Admin Panel */}
        {isAdmin && (
          <div className="flex-1 bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-gray-200">

            <h2 className="text-3xl font-bold text-[var(--color-primary)] text-center mb-8">
              Admin Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {[
                { name: "Profile", link: "/profile" },
                { name: "Categories", link: "/categories" },
                { name: "Products", link: "/products" },
                { name: "Users", link: "/users" },
                { name: "Orders", link: "/orders" },
                { name: "Statistics", link: "/stats" },
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={() => router.push(btn.link)}
                  className="py-4 rounded-xl bg-[var(--color-primary)] text-white shadow-md hover:bg-[var(--color-primary-hover)] transition font-semibold"
                >
                  {btn.name}
                </button>
              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}