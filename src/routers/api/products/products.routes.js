import Router from 'koa-router';
import ProductController from '../../../controllers/products/products.controller.js';

const router = new Router();

class ProductRoutes {
    constructor() {
        this.controller = new ProductController();
    }

    initialize() {
        router.get(`/:id?`, this.controller.getProductsController);
        router.post(`/`, this.controller.addProductController);
        router.put(`/:id`, this.controller.updProductController);
        router.delete(`/:id`, this.controller.deleteProductController);
        return router;
    }
}

export default new ProductRoutes();