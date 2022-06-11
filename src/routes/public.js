import Router from 'koa-router';
import ctr from '#ctr';

const router = Router();

router.post('/api/upload', ctr.upload);
router.get('/api/search', ctr.search);
router.post('/api/del', ctr.del);
router.get('/api/getFiles', ctr.getFiles);

export default router;