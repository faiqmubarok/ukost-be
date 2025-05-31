import productRepository from "./product.repository.js";

const {
  createProduct,
  findUserReplicaById,
  findProductById,
  deleteProductById,
  findAllProduct,
  updateProductById,
} = productRepository;

const findAllProductService = async (query) => {
  const products = findAllProduct(query);
  return products;
};

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

const updateProductByIdService = async (id, data) => {
  const existProduct = await findProductById(id);

  if (!existProduct) throw new Error("Product not found");

  // Cek ownerId hanya jika ada di payload
  if (data.ownerId) {
    const ownerExists = await findUserReplicaById(data.ownerId);
    if (!ownerExists) throw new Error("Owner not found");
  }

  // Cek managerId hanya jika ada di payload
  if (data.managerId) {
    const managerExists = await findUserReplicaById(data.managerId);
    if (!managerExists) throw new Error("Manager not found");
  }

  const product = await updateProductById(id, data);
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
  updateProductByIdService,
  findAllProductService,
};
