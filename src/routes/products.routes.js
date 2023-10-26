import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { checkRoles, checkUserAuthenticatedView } from "../middlewares/auth.js";

const router = Router();

router.get("/", ProductsController.getProducts);
router.get("/:pid", ProductsController.getProduct);
router.post("/", checkUserAuthenticatedView, checkRoles(["admin"]), ProductsController.createProduct);
router.put("/:id", checkUserAuthenticatedView, checkRoles(["admin"]), ProductsController.updateProduct);
router.delete("/:id", checkUserAuthenticatedView, checkRoles(["admin"]), ProductsController.deleteProduct);

export { router as productsRouter};