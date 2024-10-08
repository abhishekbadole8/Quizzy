import { Router } from 'express';
import { createUser, loginUser } from '../controllers/userController'; // Adjust the path if needed

const router = Router();

router.post('/register', createUser);

router.post('/login', loginUser);

export default router;
