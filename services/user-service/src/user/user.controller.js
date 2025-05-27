import { Router } from "express";
import userService from "./user.service.js";

const router = Router();
const { getAllUserService, getUserByIdService } = userService;

router.get("/", async (req, res) => {
  const users = await getAllUserService();
  res.status(200).json({ users });
});

router.get("/:id", async (req, res) => {
  const user = await getUserByIdService(req.params.id);
  res.status(200).json({ user });
});

export default router;
