import userRepository from "../user/user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../utils/email.js";
import { publishUserEvent } from "../events/publisher.js";

const {
  findUserByEmail,
  createUser,
  updateResetToken,
  findUserByResetToken,
  updatePassword,
} = userRepository;

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "je2JDX1kLTYIMH0dUTwRSChwlaAXSwf3";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

const registerService = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  const user = await createUser({
    ...userData,
    password: hashedPassword,
  });

  if (["OWNER", "MANAGER"].includes(user.role)) {
    await publishUserEvent("user_updated", {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      photo: user.photo,
    });
  }
  
  return user;
};

const loginService = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

const requestPasswordResetService = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 60 * 60 * 1000);

  await updateResetToken(user.id, token, expiry);

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await sendResetPasswordEmail(user.email, resetLink);
};

const resetPasswordService = async (token, newPassword) => {
  const user = await findUserByResetToken(token);
  if (!user) throw new Error("Token invalid or expired");

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await updatePassword(user.id, hashedPassword);
};

export default {
  registerService,
  loginService,
  resetPasswordService,
  requestPasswordResetService,
};
