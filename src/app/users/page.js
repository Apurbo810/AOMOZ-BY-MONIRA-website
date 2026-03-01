"use client";
<<<<<<< HEAD

=======
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UsersPage() {
<<<<<<< HEAD

  const { data: session, status } =
    useSession();

  const router = useRouter();

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const res =
        await fetch("/api/users");

      if (!res.ok)
        throw new Error(
          "Failed to fetch users"
        );

      const data =
        await res.json();

      setUsers(data);

    } catch (err) {

      toast.error(err.message);

    } finally {

      setLoading(false);

    }

  };

  const deleteUser = async (id) => {

    if (!confirm(
      "Delete this user?"
    )) return;

    try {

      const res =
        await fetch(
          `/api/users?id=${id}`,
          { method: "DELETE" }
        );

      const data =
        await res.json();

      if (!res.ok)
        throw new Error(
          data.message
        );

      toast.success(
        "User deleted"
      );

      setUsers(
        users.filter(
          (u) =>
            u._id !== id
        )
      );

    } catch (err) {

      toast.error(err.message);

    }

  };

  useEffect(() => {

    if (status === "unauthenticated")
      router.push("/login");

    if (session?.user?.admin)
      fetchUsers();

  }, [session, status]);

  if (status === "loading" || loading)
    return (

      <div className="flex justify-center items-center min-h-screen bg-[var(--color-bg-primary)]">

        <div className="text-center">

          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[var(--color-primary)] mx-auto"></div>

          <p className="mt-4 text-lg text-[var(--color-primary)] font-semibold">
            Loading users...
          </p>

        </div>

      </div>

=======
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete user");

      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (session?.user?.admin) fetchUsers();
  }, [session, status]);

  // Loader for the page
  if (status === "loading" || loading)
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
        <span className="mt-4 text-xl font-semibold text-amber-700">Loading users...</span>
      </div>
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
    );

  if (!session?.user?.admin)
    return (
<<<<<<< HEAD

      <p className="text-center mt-10 text-[var(--color-primary)] text-xl font-semibold">
        Access denied
      </p>

    );

  return (

    <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-[var(--color-primary)] mb-8">
          Users
        </h1>

        {users.length === 0 ? (

          <p className="text-center text-gray-500">
            No users found.
          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-center">

              <thead>

                <tr className="bg-[var(--color-primary)] text-white">

                  <th className="p-3">
                    Name
                  </th>

                  <th className="p-3">
                    Email
                  </th>

                  <th className="p-3">
                    Admin
                  </th>

                  <th className="p-3">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.map((u) => (

                  <tr
                    key={u._id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="p-3">
                      {u.name}
                    </td>

                    <td className="p-3">
                      {u.email}
                    </td>

                    <td className="p-3">

                      {u.admin ? (
                        <span className="text-[var(--color-primary)] font-bold">
                          Yes
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          No
                        </span>
                      )}

                    </td>

                    <td className="p-3">

                      <button
                        onClick={() =>
                          deleteUser(u._id)
                        }
                        className="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-semibold transition"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}
=======
      <p className="text-center mt-10 text-red-600 text-xl font-semibold">
        Access denied
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-10 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#4b0000]">
        Users
      </h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center text-lg">
            <thead>
              <tr className="bg-amber-200 text-base md:text-lg">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Admin</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-100 transition-colors">
                  <td className="p-3 border">{u.name}</td>
                  <td className="p-3 border">{u.email}</td>
                  <td className="p-3 border">{u.admin ? "✅" : "❌"}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
