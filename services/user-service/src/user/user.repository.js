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

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
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

const findUserByResetToken = (token) => {
  return prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetTokenExpiry: { gt: new Date() },
    },
  });
};

const findAllUsers = async ({ search, role, page, limit }) => {
  const take = Number(limit) || 10;
  const skip = ((Number(page) || 1) - 1) * take;

  const where = {
    AND: [
      search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {},
      role ? { role } : {},
    ],
  };

  const [users, userFound, totalUser] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        photo: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.user.count({ where }),
    prisma.user.count(),
  ]);

  const totalPages = Math.ceil(userFound / take);

  return {
    users,
    totalUser,
    totalPages,
    page: Number(page) || 1,
    limit: take,
  };
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

const deleteUser = (userId) => {
  return prisma.user.delete({
    where: { id: userId },
  });
};

export default {
  findUserById,
  findUserByEmail,
  findUserByResetToken,
  updateResetToken,
  updatePassword,
  createUser,
  findAllUsers,
  deleteUser,
};
