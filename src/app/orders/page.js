"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBoxOpen } from "react-icons/fa";
import { MdLocalShipping, MdDoneAll } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) return router.push("/");

    fetchOrders();
  }, [session, status]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/orders");
      const data = session.user.admin
        ? res.data
        : res.data.filter((o) => o.user_email === session.user.email);

      setOrders(data);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status, notes = "") => {
    try {
      await axios.put("/api/orders", { 
        orderId, 
        status,
        admin_notes: notes 
      });
      toast.success("Status updated");
      fetchOrders();
    } catch {
      toast.error("Update failed");
    }
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleString("en-BD", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusBadge = (s, paymentStatus, paymentMethod) => {
    const colors = {
      Pending: "bg-yellow-500 text-white",
      Processing: "bg-blue-500 text-white",
      Delivered: "bg-green-600 text-white",
      Cancelled: "bg-red-600 text-white"
    };
    
    let displayStatus = s;
    if (s === "Pending" && paymentMethod === "BKASH") {
      displayStatus = paymentStatus === "Completed" ? "Payment Confirmed" : "Awaiting Payment";
    }
    
    return <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[s] || "bg-gray-300"}`}>{displayStatus}</span>;
  };

  if (status === "loading" || loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
      </div>
    );

  if (!orders.length)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <FaBoxOpen className="text-7xl text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">No orders found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white px-6 py-14 relative overflow-hidden">
      <div className="absolute w-[900px] h-[900px] bg-red-500/10 blur-3xl rounded-full left-1/2 -translate-x-1/2 -top-40"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h1 className="text-4xl font-extrabold text-red-600 mb-10 tracking-wide">
          {session.user.admin ? "All Orders" : "My Orders"}
        </h1>

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-md border border-red-200/40 hover:shadow-xl transition"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold text-gray-700">
                  Order <span className="text-red-600 font-bold">{order.order_id}</span>
                </p>
                {statusBadge(order.status, order.payment_status, order.payment_method)}
              </div>

              <p className="text-sm text-gray-500 mb-4">
                <b>Date:</b> {formatDate(order.createdAt)}
              </p>

              {/* Customer Info */}
              <div className="grid gap-1 text-gray-700 mb-5">
                <p><b>Name:</b> {order.customer_name || "-"}</p>
                <p><b>Address:</b> {order.customer_address || "-"}</p>
                <p><b>Phone:</b> {order.customer_phone || "-"}</p>
                <p><b>Total:</b> <span className="text-red-600 font-semibold">৳ {order.total}</span></p>
                <p><b>Payment:</b> {order.payment_method}</p>
                
                {order.payment_method === "BKASH" && order.bkash_trx_id && (
                  <p><b>bKash TrxID:</b> {order.bkash_trx_id}</p>
                )}
              </div>

              {/* Items */}
              <div className="bg-gray-50 p-5 rounded-xl mb-5">
                <h3 className="font-semibold mb-3">Items</h3>
                <ul className="space-y-3">
                  {order.items.map((item) => (
                    <li key={item._id} className="flex justify-between items-center text-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill
                            className="rounded-lg border object-cover" 
                          />
                        </div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-semibold">× {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Admin Notes */}
              {order.admin_notes && (
                <div className="bg-blue-50 p-4 rounded-xl mb-5 border border-blue-200">
                  <p className="text-sm text-gray-600"><b>Admin Notes:</b></p>
                  <p className="text-sm text-gray-700">{order.admin_notes}</p>
                </div>
              )}

              {/* Admin Actions */}
              {session.user.admin && order.status !== "Cancelled" && (
                <div className="space-y-3 pt-2">
                  <div className="flex gap-3">
                    {order.status === "Pending" && order.payment_status === "Completed" && (
                      <button
                        onClick={() => updateStatus(order.order_id, "Processing")}
                        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        <MdLocalShipping /> Mark as Processing
                      </button>
                    )}
                    {(order.status === "Processing" || (order.status === "Pending" && order.payment_method === "COD")) && (
                      <button
                        onClick={() => updateStatus(order.order_id, "Delivered")}
                        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        <MdDoneAll /> Mark as Delivered
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}