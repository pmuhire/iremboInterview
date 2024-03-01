import express from 'express';
import { userController } from "../controllers/UserController";
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/users', userController.getAllUsers.bind(userController));
router.get('/users/:id', userController.getUserById.bind(userController));
router.post('/users', userController.createUser.bind(userController));
router.put('/users/:id', authMiddleware, userController.updateUser.bind(userController));
router.delete('/users/:id', authMiddleware, userController.deleteUser.bind(userController));
router.post('/login', userController.login.bind(userController));

export default router;