import { Router } from 'express';
import authController from '../controllers/authController';
import { body } from 'express-validator';
import validate from '../middlewares/validateMiddleware';

// src/routes/authRoutes.js
const router = Router();

// Validaciones para registro
const registerValidation = [
    body('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
];

// Validaciones para login
const loginValidation = [
    body('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

// Rutas
router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);

export default router;
