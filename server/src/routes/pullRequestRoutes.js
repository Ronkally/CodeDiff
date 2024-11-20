import { Router } from 'express';
import { getPullRequests, createPullRequest, getPullRequestById, updatePullRequestById} from '../controllers/pullRequestController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/pull-requests', authMiddleware, getPullRequests);
router.post('/pull-requests', authMiddleware, createPullRequest);
router.get('/pull-requests/:id', authMiddleware, getPullRequestById);
router.put('/pull-requests/:id', authMiddleware, updatePullRequestById);

export default router;