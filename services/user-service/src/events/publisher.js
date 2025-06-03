import { createClient } from "redis";

const publisher = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

publisher.on("error", (err) => console.error("Redis Publisher Error", err));

await publisher.connect();

export const publishUserEvent = async (event, payload) => {
  await publisher.publish(event, JSON.stringify(payload));
};
