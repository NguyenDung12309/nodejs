import { loginController, registerController } from '@/controllers/authController';
import { validatorMiddleWare } from '@/middleware/validatorMiddleware';
import { Router } from 'express';

export const authRouter = Router();

authRouter.post('/login', loginController);

authRouter.post('/register', validatorMiddleWare('registerSchema'), registerController);
