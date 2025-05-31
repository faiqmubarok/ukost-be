import { Router } from "express";
import {
  createProductSchema,
  productQuerySchema,
  putProductSchema,
} from "./product.validation.js";
import productService from "./product.service.js";

const router = Router();
const {
  createProductService,
  getProductByIdService,
  deleteProductByIdService,
  findAllProductService,
  updateProductByIdService,
} = productService;

router.get("/", async (req, res) => {
  try {
    const query = await productQuerySchema.validate(req.query, {
      stripUnknown: true,
      abortEarly: false,
    });

    const products = await findAllProductService(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: "Invalid query", errors: err.errors });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.params.id) throw new Error("Product id is required");
    const validated = await putProductSchema.validate(req.body, {
      abortEarly: false,
    });
    const updated = await updateProductByIdService(
      req.params.id,
      validated,
      true
    );
    res.status(200).json({ updated, message: "Product updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    if (!req.params.id) throw new Error("Product id is required");
    if (!req.body) throw new Error("Product data is required");
    const updated = await updateProductByIdService(req.params.id, req.body);
    res.status(200).json({ message: "Product updated successfully", updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = await createProductSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const product = await createProductService(payload);

    return res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: error.errors });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteProductByIdService(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
