import prisma from "../config/prisma.js";

const createUser = async (user) => {
  return await prisma.user.create({
    data: user,
  });
};

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export default {
  findUserByEmail,
  createUser,
};
