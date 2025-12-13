import { Router } from 'express';

import * as productsController from '#api/products/products.controller.js';
import { auth } from '#middlewares/auth.js';

const router = Router();

// CRUD Sorted
router.post('/create', auth, productsController.create);
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.patch('/update', auth, productsController.update);
router.delete('/:id', auth, productsController.remove);

export default router;
