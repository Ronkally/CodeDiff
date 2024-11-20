import prisma from '../config/prisma.js';

const getPullRequests = async (req, res, next) => {
  try {
    const pullRequests = await prisma.pullRequest.findMany({
      include: {
        approver: {
          select: {
            name: true,
          },
        },
        author: {
          select: { 
            name: true,
          },	
        },
      },
    });

    const rows = pullRequests.map((pullRequest) => {
      return {
        id: pullRequest.id,
        title: pullRequest.title,
        description: pullRequest.description,
        isApproved: pullRequest.isApproved,
        author: pullRequest.author.name,
        approver: pullRequest.approver ? pullRequest.approver.name : null,
      }});

    res.status(200).json( rows );
  } catch (error) {
    next(error);
  }
}

const getPullRequestById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const pullRequest = await prisma.pullRequest.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        approver: {
          select: {
            name: true,
          },
        },
        changes: {
          include: {
            change: true,
          },
        }
      }
    });
    res.status(200).json({ pullRequest });
  }
  catch (error) {
    next(error);
  }
}

const updatePullRequestById = async (req, res, next) => {
  const { id } = req.params;
  const  user  = JSON.parse(req.headers.user);
  try {
    const pullRequest = await prisma.pullRequest.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isApproved: true,
        approver: {
          connect: {
            id: user.id
          }
        }
      }
    });
    res.status(200).json({ pullRequest });
  }
  catch (error) {
    next(error);
  }
}

const createPullRequest = async (req, res, next) => {
  const { title, description, changes } = req.body;
  const { id } = JSON.parse(req.headers.user);

  try {
    const pullRequest = await prisma.pullRequest.create({
      data: {
        title: title,
        description: description,
        isApproved: false,
        authorId: id,
        changes: {
          create: [
            ...changes.map((changeCode) => ({ change: { create: changeCode } }))
          ]
        }
      },
    });

    res.status(201).json({ pullRequest });
  }
  catch (error) {
    next(error);
  }
}

export { getPullRequests, createPullRequest, getPullRequestById, updatePullRequestById };