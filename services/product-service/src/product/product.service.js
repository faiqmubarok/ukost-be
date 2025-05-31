import productRepository from "./product.repository.js";

const { createProduct, findUserReplicaById } = productRepository;

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

export default {
  createProductService,
};
