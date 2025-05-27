import userRepository from "./user.repository.js";

const { findAllUsers, findUserById, deleteUser } = userRepository;

const getAllUserService = async (query) => {
  const users = findAllUsers(query);
  return users;
};

const getUserByIdService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw new Error("User not found");
  return user;
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
};
