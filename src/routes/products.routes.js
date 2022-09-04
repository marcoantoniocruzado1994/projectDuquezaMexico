import { Router } from "express";
const router = Router();
import * as ProductsController from "../controllers/products.controllers";
import { AuthJwt} from "../middlewares";

// GET /products => getProducts
router.get("/", ProductsController.getProducts);
// GET /products/:id => getProductById
router.get("/:id", ProductsController.getProductById);
// POST /products => createProduct
router.post("/", [AuthJwt.verifyToken,AuthJwt.isModerator], ProductsController.createProduct);
// PUT /products/:id => updateProduct
router.put("/:id", [AuthJwt.verifyToken,AuthJwt.isAdmin], ProductsController.updateProduct);
// DELETE /products/:id => deleteProduct
router.delete("/:id", [AuthJwt.verifyToken,AuthJwt.isAdmin], ProductsController.deleteProduct);

export default router;
