import prisma from '../config/prisma.js';

const adminMiddleware = async (req, res, next) => {
    const  user  = JSON.parse(req.headers.user);
    
    if (user) {
        try {
            const userdb = await prisma.user.findUnique({
                where: {
                    id: user.id,
                },
            });

            if (userdb && userdb.isAdmin) {
                next();
            }
        }
        catch (error) {
            return res.status(401).json({ mensaje: 'Acceso denegado' });
        }
    } 
    else {
        return res.status(401).json({ mensaje: 'Acceso denegado' });
    }
};

export default adminMiddleware;
