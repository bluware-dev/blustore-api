import { Router } from 'express';

import authRouter from '#api/auth/auth.routes.js';
import productsRouter from '#api/products/products.routes.js';

const router = Router();

router.use('/products', productsRouter);
router.use('/auth', authRouter);

export default router;
