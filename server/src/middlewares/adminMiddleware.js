import prisma from '../config/prisma.js';

const adminMiddleware = (req, res, next) => {
    const  user  = JSON.parse(req.headers.user);
    if (user) {
        try {
            const user = prisma.user.findUnique({
                where: {
                    id: user.id,
                },
            });
            if (user.isAdmin) {
                next();
            }
        }
        catch (error) {
            return res.status(401).json({ mensaje: 'Acceso denegado' });
        }
    } 
    return res.status(401).json({ mensaje: 'Acceso denegado' });
};

export default adminMiddleware;
