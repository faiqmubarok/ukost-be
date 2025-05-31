import userRepository from "./user.repository.js";
import { publishUserEvent } from "../events/publisher.js";

const { findAllUsers, findUserById, deleteUser, updateUserById } =
  userRepository;

const getAllUserService = async (query) => {
  const users = findAllUsers(query);
  return users;
};

const getUserByIdService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw new Error("User not found");
  return user;
};

const updateUserByIdService = async (userId, data) => {
  const existingUser = await findUserById(userId);
  if (!existingUser) throw new Error("User not found");

  const user = await updateUserById(userId, data);

  if (["OWNER", "MANAGER"].includes(user.role)) {
    await publishUserEvent("user_updated", user);
  } else {
    await publishUserEvent("user_updated", user);
  }

  return user;
};

const deleteUserByIdService = async (userId) => {
  const existingUser = await findUserById(userId);
  if (!existingUser) throw new Error("User not found");

  const user = await deleteUser(userId);

  await publishUserEvent("user_updated", {
    id: user.id,
    role: null,
  });

  return user;
};

export default {
  getAllUserService,
  getUserByIdService,
  deleteUserByIdService,
  updateUserByIdService,
};
