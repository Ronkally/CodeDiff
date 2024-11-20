import prisma from '../config/prisma.js';

const getallUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany( {
        select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true,
            isApprover: true,
        },
    });
    res.status(200).json(users);
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
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        isApprover: true,
      },
    });

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
      },
      data: {
        name,
        email,
        isAdmin,
        isApprover,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

const createUser = async (req, res, next) => {
    const { name, email, isAdmin, isApprover } = req.body;
    
    try {
        const user = await prisma.user.create({
        data: {
            name,
            email,
            isAdmin,
            isApprover,
        },
    });
    
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => { 
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

export { getallUsers, getUserById, deleteUser, updateUser, createUser}

