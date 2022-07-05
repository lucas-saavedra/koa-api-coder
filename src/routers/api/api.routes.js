import Router from 'koa-router';
import productRoutes from "./products/products.routes.js";
const router = new Router({
    prefix: '/productos'
});

router.use(productRoutes.initialize().routes());

export default router;