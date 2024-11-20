import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import { createUser, deleteUser, getallUsers, getUserById, updateUser } from '../controllers/adminController.js';

const router = Router();

router.get('/user', authMiddleware, adminMiddleware, getallUsers);
router.get('/user/:id', authMiddleware, adminMiddleware, getUserById);
router.put('/user/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/user/:id', authMiddleware, adminMiddleware, deleteUser);
router.post('/user/:id', authMiddleware, adminMiddleware, createUser)

export default router;