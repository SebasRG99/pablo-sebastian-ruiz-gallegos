import { Router } from 'express';
import { signIn, login } from '../controllers/Auth';

const router: Router = Router();

// Registrar nuevo usuario
router.post('/signIn', signIn);

// Login con usuario existente
router.post('/login', login);

export default router;