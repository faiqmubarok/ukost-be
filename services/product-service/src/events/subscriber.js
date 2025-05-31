import { createClient } from "redis";
import prisma from "../config/prisma.js";

const subscriber = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

subscriber.on("error", (err) => console.error("Redis Subscriber Error", err));

await subscriber.connect();

await subscriber.subscribe("user_updated", async (message) => {
  try {
    const data = JSON.parse(message);
    const { id, name, email, role, phone, photo } = data;

    if (role === "OWNER" || role === "MANAGER") {
      await prisma.userReplica.upsert({
        where: { id },
        update: { name, email, role, phone, photo },
        create: { id, name, email, role, phone, photo },
      });
    } else {
      await prisma.userReplica.deleteMany({ where: { id } });
    }
  } catch (error) {
    console.error("Failed to process user_updated event:", error);
  }
});
