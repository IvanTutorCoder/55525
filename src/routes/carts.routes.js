import { Router } from "express";
import { CartsController } from "../controllers/carts.controller.js";
import { checkRoles, checkUserAuthenticatedView } from "../middlewares/auth.js"

const router = Router();

router.post("/", CartsController.createCart);
router.post("/:cid", checkUserAuthenticatedView, checkRoles(["user"]), CartsController.getCartById);
router.get("/:id", CartsController.renderCart);
router.post("/:cid/product/:pid", checkUserAuthenticatedView, checkRoles(["user"]), CartsController.addProduct);
router.post("/:cid/purchase", CartsController.purchase);
router.delete("/:cid/product/:pid", CartsController.deleteProduct);

export { router as cartsRouter};