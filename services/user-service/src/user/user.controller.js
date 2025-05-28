import { Router } from "express";
import userService from "./user.service.js";

const router = Router();
const {
  getAllUserService,
  getUserByIdService,
  deleteUserByIdService,
  updateUserByIdService,
} = userService;
import { putUserSchema } from "./user.validation.js";

router.get("/", async (req, res) => {
  try {
    const users = await getAllUserService(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await putUserSchema.validate(req.body);
    const user = await updateUserByIdService(req.params.id, req.body);
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user = await updateUserByIdService(req.params.id, req.body);
    res.status(200).json({ user, message: "User updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteUserByIdService(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
