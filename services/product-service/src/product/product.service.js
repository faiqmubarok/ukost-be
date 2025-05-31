import productRepository from "./product.repository.js";

const {
  createProduct,
  findUserReplicaById,
  findProductById,
  deleteProductById,
} = productRepository;

const createProductService = async (payload) => {
  const ownerExists = await findUserReplicaById(payload.ownerId);

  if (!ownerExists) {
    throw new Error("Owner not found");
  }

  const managerExists = await findUserReplicaById(payload.managerId);

  if (!managerExists) {
    throw new Error("Manager not found");
  }

  return await createProduct(payload);
};

const getProductByIdService = async (id) => {
  const product = await findProductById(id);
  if (!product) throw new Error("Product not found");
  return product;
};

const deleteProductByIdService = async (id) => {
  const product = await findProductById(id);
  if (!product) throw new Error("Product not found");
  return await deleteProductById(id);
};

export default {
  createProductService,
  getProductByIdService,
  deleteProductByIdService,
};
