import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verificar si el header de autorización existe
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ mensaje: 'Autenticación requerida' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Agregar la información del usuario al request
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};

export default authMiddleware;
