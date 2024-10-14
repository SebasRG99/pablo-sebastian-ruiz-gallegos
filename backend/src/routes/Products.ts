import { Router } from "express";
import { 
    getProducts, 
    getProductsByIds, 
    postBatchProducts, 
    putBatchProducts, 
    deleteBatchProducts,
    deleteAllProducts 
} from "../controllers/Products";
import { verifyJWT } from "../middlewares/JWT";
import { validatePayload } from "../middlewares/validatePayload";
import { createProductSchema, putProductSchema } from "../validators/productValidator";

const router: Router = Router();

// Obtener todos los productos
router.get("/all", verifyJWT, getProducts); //Lista

// Obtener varios productos por IDs (batch GET)
router.get("/batch", verifyJWT, getProductsByIds); //Lista

// Crear múltiples productos (batch POST)
router.post("/batch", verifyJWT, validatePayload(createProductSchema), postBatchProducts); //Lista

// Actualizar múltiples productos (batch PUT)
router.put("/batch", verifyJWT, validatePayload(putProductSchema), putBatchProducts); //Lista

// Eliminar un producto por ID
router.delete("/batch", verifyJWT, deleteBatchProducts); //Lista

// Eliminar todos los productos
router.delete("/all", verifyJWT, deleteAllProducts); //Lista

export default router;