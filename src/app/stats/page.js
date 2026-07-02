"use client";

import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminStatsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user.admin) {
      toast.error("Access Denied");
      router.push("/");
    } else {
      fetchStats();
    }
  }, [session, status]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--color-bg-primary)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[var(--color-primary)] border-solid"></div>
      </div>
    );
  }

  const monthlyData = {
    labels: stats.monthlyStats.map((s) => `Month ${s._id}`),
    datasets: [
      {
        label: "Total Orders",
        data: stats.monthlyStats.map((s) => s.totalOrders),
        backgroundColor: "rgba(201, 162, 39, 0.7)", // GOLD
      },
      {
        label: "Total Revenue (৳)",
        data: stats.monthlyStats.map((s) => s.totalRevenue),
        backgroundColor: "rgba(31, 111, 67, 0.7)", // GREEN
      },
    ],
  };

  const dailyData = {
    labels: stats.dailyStats.map((s) => `Day ${s._id}`),
    datasets: [
      {
        label: "Daily Orders",
        data: stats.dailyStats.map((s) => s.totalOrders),
        borderColor: "rgba(201, 162, 39, 1)", // GOLD
        backgroundColor: "rgba(201, 162, 39, 0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Daily Revenue (৳)",
        data: stats.dailyStats.map((s) => s.totalRevenue),
        borderColor: "rgba(31, 111, 67, 1)", // GREEN
        backgroundColor: "rgba(31, 111, 67, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-[var(--color-bg-primary)] min-h-screen">
      
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-[var(--color-primary)]">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Total Stats Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">
            Total Stats
          </h2>

          <p className="text-lg text-[var(--color-text-primary)]">
            <strong className="text-[var(--color-accent)]">
              Total Orders:
            </strong>{" "}
            {stats.totalStats.totalOrders}
          </p>

          <p className="text-lg text-[var(--color-text-primary)]">
            <strong className="text-[var(--color-accent)]">
              Total Revenue:
            </strong>{" "}
            ৳ {stats.totalStats.totalRevenue}
          </p>
        </div>

        {/* Monthly Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">
            Monthly Stats
          </h2>

          <Bar
            data={monthlyData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Monthly Orders & Revenue",
                  color: "#1F6F43",
                  font: { size: 16, weight: "bold" },
                },
                tooltip: {
                  callbacks: {
                    label: (ctx) =>
                      `${ctx.dataset.label}: ৳${ctx.parsed.y}`,
                  },
                },
              },
            }}
          />
        </div>

        {/* Daily Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">
            Daily Stats (Current Month)
          </h2>

          <Line
            data={dailyData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Daily Orders & Revenue",
                  color: "#1F6F43",
                  font: { size: 16, weight: "bold" },
                },
                tooltip: {
                  callbacks: {
                    label: (ctx) =>
                      `${ctx.dataset.label}: ৳${ctx.parsed.y}`,
                  },
                },
              },
            }}
          />
        </div>

      </div>
    </div>
  );
}