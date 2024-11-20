import { Router } from 'express';
import {register, login} from '../controllers/authController.js';
import { body } from 'express-validator';
import validate from '../middlewares/validateMiddleware.js';

// src/routes/authRoutes.js
const router = Router();

// Validaciones para registro
const registerValidation = [
    body('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
];

// Validaciones para login
const loginValidation = [
    body('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

// Rutas
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);



export default router;
