import axios from "axios";
import qs from "querystring";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      amount,
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      order_id,
    } = body;

    const store_id = process.env.SSLCOMMERZ_STORE_ID;
    const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;

    const post_data = {
      store_id,
      store_passwd,
      total_amount: amount,
      currency: "BDT",
      tran_id: order_id,

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel`,

      emi_option: 0,
      cus_name: customer_name,
      cus_email: customer_email,
      cus_phone: customer_phone,
      cus_add1: customer_address,

      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1207",
      cus_country: "Bangladesh",

      shipping_method: "NO",
      num_of_item: 1,
      product_name: "Order Payment",
      product_category: "Food",
      product_profile: "general",
    };

    const sslcommerz_url =
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

    const response = await axios.post(
      sslcommerz_url,
      qs.stringify(post_data),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return new Response(
      JSON.stringify({ error: "Payment initiation failed" }),
      { status: 500 }
    );
  }
}
