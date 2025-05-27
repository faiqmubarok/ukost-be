import userRepository from "../user/user.repository.js";
import bcrypt from "bcryptjs";

const { findUserByEmail, createUser } = userRepository;

const SALT_ROUNDS = 10;

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

export default {
  registerService,
};
