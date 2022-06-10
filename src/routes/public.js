import Router from 'koa-router';
import ctr from '#ctr';

const router = Router();

router.get('/hello', ctr.hello);
router.post('/api/upload', ctr.upload);

export default router;