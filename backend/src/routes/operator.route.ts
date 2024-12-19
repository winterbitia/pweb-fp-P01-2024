import { Router } from "express";
import { OperatorController } from "../controllers/operator.controller";

const router = Router();
const operatorController = new OperatorController();

router.get("/hc", operatorController.healthCheck);
router.get("/", operatorController.getAllOperators);
router.post("/", operatorController.addOperator);
router.get("/:id", operatorController.getOperatorById);
router.patch("/:id", operatorController.updateOperator);
router.delete("/:id", operatorController.deleteOperator);

export default router;