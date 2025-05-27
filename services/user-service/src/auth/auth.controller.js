import { Router } from "express";
import authService from "./auth.service.js";

const router = Router();
const {
  registerService,
  loginService,
  resetPasswordService,
  requestPasswordResetService,
} = authService;

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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const result = await loginService(email, password);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { token, ...userData } = result;

    res.status(200).json({
      message: "Login successful",
      data: userData,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    await requestPasswordResetService(email);
    res.status(200).json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password required" });
  }

  try {
    await resetPasswordService(token, newPassword);
    res.status(200).json({ message: "Password has been reset" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
