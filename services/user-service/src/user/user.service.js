import userRepository from "./user.repository.js";

const { findAllUsers } = userRepository;

const getAllUserService = async () => {
  const users = findAllUsers();
  return users;
};

export default {
  getAllUserService,
};
