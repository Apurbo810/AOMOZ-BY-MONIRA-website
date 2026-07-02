'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useCart } from "@/context/CartContext";

export default function PaymentProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentID = searchParams.get("paymentID");
  const [processing, setProcessing] = useState(true);
  const { clearCart } = useCart();

  useEffect(() => {
    if (!paymentID) {
      router.push("/payment-fail");
      return;
    }

    executePayment();
  }, [paymentID]);

  const executePayment = async () => {
    try {
      const tokenRes = await axios.post("/api/payment/bkash/grant-token");
      if (!tokenRes.data.success) return router.push("/payment-fail");
      const token = tokenRes.data.id_token;

      const executeRes = await axios.post("/api/payment/bkash/execute-payment", { 
        paymentID, 
        token 
      });

      if (executeRes.data.success && executeRes.data.transactionStatus === "Completed") {
        const trxID = executeRes.data.trxID;

        const ordersRes = await axios.get("/api/orders");
        const order = ordersRes.data.find(o => o.bkash_payment_id === paymentID);

        if (order) {
          await axios.put("/api/orders", {
            orderId: order.order_id,
            status: "Processing",
            payment_status: "Completed",
            bkash_trx_id: trxID,
          });

          for (const item of order.items) {
            await axios.put("/api/products", { 
              id: item._id, 
              stock: -item.quantity 
            });
          }
        }

        clearCart();
        router.push(`/payment-success?trxID=${trxID}`);
      } else {
        router.push("/payment-fail");
      }
    } catch (error) {
      console.error(error);
      router.push("/payment-fail");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-50 to-pink-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg text-center border border-pink-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600 mx-auto mb-6"></div>
        <h1 className="text-3xl font-extrabold text-pink-700 tracking-wide">
          Processing Payment...
        </h1>
        <p className="text-gray-600 mt-4">
          Please wait while we confirm your bKash payment.
        </p>
      </div>
    </div>
  );
}