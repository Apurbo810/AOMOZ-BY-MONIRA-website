import mongoose from "mongoose";
import "dotenv/config";
import dns from 'dns'

dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function run() {
  await mongoose.connect(process.env.MONGO_URL);

  const products = await mongoose.connection
    .collection("products")
    .find({})
    .toArray();

  products.forEach((p) => {
    console.log(
      `${p.name} | hasSizes: ${p.hasSizes} | sizes: ${JSON.stringify(p.sizes)} | price: ${p.price} | stock: ${p.stock}`
    );
  });

  await mongoose.disconnect();
}

run().catch(console.error);