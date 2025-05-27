import userRepository from "../user/user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { findUserByEmail, createUser } = userRepository;

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

export default {
  registerService,
  loginService,
};
