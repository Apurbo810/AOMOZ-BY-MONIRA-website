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
<<<<<<< HEAD

=======
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
<<<<<<< HEAD

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

=======
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
  const [isAdmin, setIsAdmin] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
<<<<<<< HEAD

=======
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
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
<<<<<<< HEAD

    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/"))
      return toast.error("Only images allowed");

    if (selectedFile.size > 1 * 1024 * 1024)
      return toast.error("Max size 1MB");

=======
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) return toast.error("Only images allowed");
    if (selectedFile.size > 1 * 1024 * 1024) return toast.error("Max size 1MB");
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Select an image");
<<<<<<< HEAD

    setUploading(true);

=======
    setUploading(true);
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
    try {
      const formData = new FormData();
      formData.append("file", file);

<<<<<<< HEAD
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

=======
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error);

      const updateForm = new FormData();
      updateForm.append("profileImage", uploadData.url);

<<<<<<< HEAD
      const updateRes = await fetch(
        "/api/user/updateProfileImage",
        {
          method: "POST",
          body: updateForm,
        }
      );

=======
      const updateRes = await fetch("/api/user/updateProfileImage", { method: "POST", body: updateForm });
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      const updateData = await updateRes.json();
      if (!updateRes.ok) throw new Error(updateData.message);

      setUser(updateData.user);
<<<<<<< HEAD

      toast.success("Photo updated!");

=======
      toast.success("Photo updated!");
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      if (update) await update({ user: updateData.user });

      setPreview(null);
      setFile(null);
      setFileName("");
<<<<<<< HEAD

=======
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveDetails = async () => {
    setSaving(true);
<<<<<<< HEAD

    try {
      const formData = new FormData();

=======
    try {
      const formData = new FormData();
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("address", address);

<<<<<<< HEAD
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

=======
      const res = await fetch("/api/user/updateProfileImage", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setUser(data.user);
      toast.success("Profile updated!");
      if (update) await update({ user: data.user });
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

<<<<<<< HEAD
  if (status === "loading")
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] px-4 py-12 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[900px] h-[900px] bg-[var(--color-primary)]/10 blur-3xl rounded-full left-1/2 -translate-x-1/2 -top-40"></div>
=======
  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-white px-4 py-12 relative overflow-hidden">
      {/* Premium Glow background */}
      <div className="absolute w-[900px] h-[900px] bg-red-500/10 blur-3xl rounded-full left-1/2 -translate-x-1/2 -top-40"></div>
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3

      <Toaster position="top-center" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 relative z-10">

        {/* Profile Card */}
<<<<<<< HEAD
        <div className="flex-1 bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-gray-200">

          <h1 className="text-4xl font-extrabold text-[var(--color-primary)] mb-8 text-center">
=======
        <div className="flex-1 bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-red-200/40">
          <h1 className="text-4xl font-extrabold text-red-600 mb-8 text-center tracking-wide">
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
            My Profile
          </h1>

          <div className="flex flex-col items-center">
<<<<<<< HEAD

            <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden shadow-lg ring-4 ring-[var(--color-primary)]/20">
=======
            <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden shadow-xl ring-4 ring-red-300/40">
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
              {preview ? (
                <Image src={preview} fill className="object-cover" alt="Preview" />
              ) : user?.profileImage ? (
                <Image src={user.profileImage} fill className="object-cover" alt="Profile" />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-400" />
              )}
            </div>

<<<<<<< HEAD
            {/* Choose button */}
            <label className="mt-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold px-6 py-2 rounded-xl shadow-md cursor-pointer transition">
=======
            {/* Upload Btn */}
            <label className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md cursor-pointer transition">
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
              Choose Image
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>

<<<<<<< HEAD
            {fileName && (
              <p className="mt-2 text-gray-600 text-sm italic">
                {fileName}
              </p>
            )}
=======
            {fileName && !uploading && <p className="mt-2 text-gray-600 text-sm italic">{fileName}</p>}
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3

            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`mt-3 px-6 py-2 rounded-xl font-semibold shadow-md transition ${
<<<<<<< HEAD
                uploading
                  ? "bg-gray-300 text-gray-600"
                  : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
=======
                uploading ? "bg-gray-300 cursor-not-allowed text-gray-700" :
                "bg-red-600 text-white hover:bg-red-700 active:scale-[0.97]"
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
              }`}
            >
              {uploading ? "Uploading..." : "Update Photo"}
            </button>
<<<<<<< HEAD

=======
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
          </div>

          {/* Form */}
          <div className="mt-10 space-y-5">
<<<<<<< HEAD

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
=======
            <div>
              <label className="font-semibold text-gray-700">Name</label>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Phone</label>
              <input
                type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Address</label>
              <textarea
                rows={3} value={address} onChange={(e) => setAddress(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
              />
            </div>

            <p className="text-gray-700">
              <b>Email:</b> {user?.email}
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
            </p>

            <button
              onClick={handleSaveDetails}
              disabled={saving}
<<<<<<< HEAD
              className={`w-full py-3 rounded-xl font-semibold transition ${
                saving
                  ? "bg-gray-300 text-gray-600"
                  : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
=======
              className={`mt-3 w-full py-3 rounded-xl font-semibold shadow-md transition ${
                saving ? "bg-gray-300 cursor-not-allowed text-gray-700" :
                "bg-red-600 text-white hover:bg-red-700 active:scale-[0.97]"
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
<<<<<<< HEAD

=======
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
          </div>
        </div>

        {/* Admin Panel */}
        {isAdmin && (
<<<<<<< HEAD
          <div className="flex-1 bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-gray-200">

            <h2 className="text-3xl font-bold text-[var(--color-primary)] text-center mb-8">
=======
          <div className="flex-1 bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-red-200/40">
            <h2 className="text-3xl font-bold text-red-600 text-center mb-8 tracking-wide">
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
              Admin Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<<<<<<< HEAD

              {[
                { name: "Profile", link: "/profile" },
                { name: "Categories", link: "/categories" },
                { name: "Products", link: "/products" },
=======
              {[
                { name: "Profile", link: "/profile" },
                { name: "Categories", link: "/categories" },
                { name: "Products", link: "/products" }, // updated
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
                { name: "Users", link: "/users" },
                { name: "Orders", link: "/orders" },
                { name: "Statistics", link: "/stats" },
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={() => router.push(btn.link)}
<<<<<<< HEAD
                  className="py-4 rounded-xl bg-[var(--color-primary)] text-white shadow-md hover:bg-[var(--color-primary-hover)] transition font-semibold"
=======
                  className="py-4 rounded-xl bg-red-600 text-white shadow-md hover:bg-red-700 transition font-semibold active:scale-[0.97]"
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
                >
                  {btn.name}
                </button>
              ))}
<<<<<<< HEAD

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
=======
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
