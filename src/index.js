import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  "/api/v1/users",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: { "^/api/v1/users": "" },
  })
);

app.use(
  "/api/v1/products",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: { "^/api/v1/products": "" },
  })
);

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running at http://localhost:${PORT}/api/v1`);
});
