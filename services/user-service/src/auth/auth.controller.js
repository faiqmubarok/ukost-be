import { Router } from "express";
import authService from "./auth.service.js";

const router = Router();
const { registerService } = authService;

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, photo } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await registerService({
      name,
      email,
      password,
      phone,
      photo,
    });
    res.status(201).json({ user, message: "User registered successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
    console.log(error);
  }
});

export default router;
