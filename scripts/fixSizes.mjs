import mongoose from "mongoose";
import "dotenv/config";
import dns from 'dns'

dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function run() {
  await mongoose.connect(process.env.MONGO_URL);

  const result = await mongoose.connection.collection("products").updateMany(
    { hasSizes: { $ne: true } },
    { $set: { sizes: [], hasSizes: false } }
  );

  console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);

  await mongoose.disconnect();
  console.log("Done.");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});