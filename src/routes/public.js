import Router from 'koa-router';
import ctr from '#ctr';

const router = Router();

router.post('/api/upload', ctr.upload);
router.get('/api/search', ctr.search);

export default router;