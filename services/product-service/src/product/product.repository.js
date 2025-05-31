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

const findAllProduct = async ({ search, type, occupant, page, limit }) => {
  const take = Number(limit) || 10;
  const skip = ((Number(page) || 1) - 1) * take;

  const where = {
    AND: [
      search
        ? {
            productName: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {},
      type ? { productType: type } : {},
      occupant ? { typeOccupant: occupant } : {},
    ],
  };

  const [products, productFound, totalProduct] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        price: true,
        address: true,
        rating: true,
        productName: true,
        image: true,
        ownerId: true,
        managerId: true,
        productType: true,
        typeOccupant: true,
        available: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.product.count({ where }),
    prisma.product.count(),
  ]);

  const totalPages = Math.ceil(productFound / take);

  return {
    products,
    totalProduct,
    totalPages,
    page: Number(page) || 1,
    limit: take,
  };
};

const findProductById = async (productId) => {
  return await prisma.product.findUnique({
    where: { id: productId },
  });
};

const deleteProductById = async (productId) => {
  return await prisma.product.delete({
    where: { id: productId },
  });
};

export default {
  createProduct,
  findUserReplicaById,
  findProductById,
  deleteProductById,
  findAllProduct,
};
