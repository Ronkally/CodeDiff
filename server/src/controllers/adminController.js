import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';

const getallUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany( {
        where: {
          isActive: true,
        },
        select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true,
            isApprover: true,
        },
    });

    const userDTO = users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: `${user.isAdmin ? 'Admin' : ''}${user.isApprover && user.isAdmin ? ', ' : '' }${user.isApprover ? 'Approver' : ''}`,
        }
    });

    res.status(200).json(userDTO);
  } catch (error) {
    next(error);
  }
}

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        isApprover: true,
      },
    });

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, isAdmin, isApprover } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
        isActive: true,
      },
      data: {
        name,
        email,
        isAdmin,
        isApprover,
      },
    });

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

const createUser = async (req, res, next) => {
    const { name, email, isAdmin, isApprover, password } = req.body;

    try {
      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        return res.status(400).json({ mensaje: 'El usuario ya existe' });
      }
  
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear nuevo usuario
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          isAdmin,
          isApprover,
        },
      });
  
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
}

const deleteUser = async (req, res, next) => { 
  console.log('deleteUser');
  
    const { id } = req.params;
    try {
        await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                isActive: false,
            },
        });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

export { getallUsers, getUserById, deleteUser, updateUser, createUser}

