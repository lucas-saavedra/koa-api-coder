
import apiRoutes from './api/api.routes.js';
import Router from 'koa-router';

const router = new Router({
    prefix: '/api'
});

router.use(apiRoutes.routes());


export default router;