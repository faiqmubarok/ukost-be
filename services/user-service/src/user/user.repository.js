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

const findUserByResetToken = (token) => {
  return prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetTokenExpiry: { gt: new Date() },
    },
  });
};

const findAllUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      photo: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const updateResetToken = (userId, token, expiry) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      resetPasswordToken: token,
      resetTokenExpiry: expiry,
    },
  });
};

const updatePassword = (userId, hashedPassword) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetTokenExpiry: null,
    },
  });
};

export default {
  findUserByEmail,
  findUserByResetToken,
  updateResetToken,
  updatePassword,
  createUser,
  findAllUsers,
};
