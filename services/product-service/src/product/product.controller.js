import { Router } from "express";
import { createProductSchema } from "./product.validation.js";
import productService from "./product.service.js";

const router = Router();
const { createProductService, getProductByIdService } = productService;

router.get("/:id", async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
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

export default router;
