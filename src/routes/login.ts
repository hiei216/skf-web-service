import { Router } from 'express';
import { login } from '../controllers/login-controllers';

const router = Router();

router.get('/login', login);

export default router;