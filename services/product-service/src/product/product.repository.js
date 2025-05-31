import prisma from "../config/prisma.js";

const createProduct = async (productData) => {
  return await prisma.product.create({
    data: productData,
  });
};

const findUserReplicaById = async (userId) => {
  return await prisma.userReplica.findUnique({
    where: { id: userId },
  });
};

export default {
  createProduct,
  findUserReplicaById,
};
