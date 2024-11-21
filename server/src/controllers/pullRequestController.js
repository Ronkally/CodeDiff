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
      orderBy: [{
        createdAt: 'desc',
      }]
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
        },
        comments: { 
          include: {
            comment: { 
              select: {
                content: true,
                author: {
                  select: {
                    name: true,
                  },
                },
              },
            },
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

const addCommentToPullRequest = async (req, res, next) => {
  const { id } = JSON.parse(req.headers.user);
  const { prId, comment } = req.body;

  try {
    const pullRequest = await prisma.pullRequest.update({
      where: {
        id: parseInt(prId),
      },
      data: {
        comments: {
          create: {
            comment: {
              create: {
                content: comment,
                pullRequestId: parseInt(prId),
                authorId: id,
              },
            },
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

export { getPullRequests, createPullRequest, getPullRequestById, updatePullRequestById, addCommentToPullRequest };