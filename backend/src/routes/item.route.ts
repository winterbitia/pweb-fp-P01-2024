import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';

const router = Router();
const itemController = new ItemController();

router.get('/hc', itemController.healthCheck);
router.get('/', itemController.getAllItems);
router.post('/', itemController.addItem);
router.get('/:id', itemController.getItemById);
router.patch('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

export default router;