import { Router } from "express";
import userService from "./user.service.js";

const router = Router();
const { getAllUserService } = userService;

router.get("/", async (req, res) => {
  const users = await getAllUserService();
  res.status(200).json({ users });
});

export default router;
