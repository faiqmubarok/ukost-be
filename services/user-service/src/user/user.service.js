import userRepository from "./user.repository.js";

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
  const user = await findUserById(userId);
  if (!user) throw new Error("User not found");
  return await updateUserById(userId, data);
};

const deleteUserByIdService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw new Error("User not found");
  return await deleteUser(userId);
};

export default {
  getAllUserService,
  getUserByIdService,
  deleteUserByIdService,
  updateUserByIdService,
};
