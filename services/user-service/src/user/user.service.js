import userRepository from "./user.repository.js";

const { findAllUsers, findUserById } = userRepository;

const getAllUserService = async () => {
  const users = findAllUsers();
  return users;
};

const getUserByIdService = async (userId) => {
  const user = await findUserById(userId);
  return user;
};

export default {
  getAllUserService,
  getUserByIdService,
};
