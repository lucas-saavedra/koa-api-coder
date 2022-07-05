import ProductsApi from "../../api/products.api.js";

class ProductController {
    constructor() {
        this.productApi = new ProductsApi()
    }
    getProductsController = async (ctx) => {
        try {
            let result;
            if (ctx.params.id) {
                const id = ctx.params.id;
                result = await this.productApi.getByIdApi(id);
                ctx.body = {
                    status: "success",
                    message: result
                }
            } else {
                result = await this.productApi.getAllApi();
                ctx.body = {
                    status: "success",
                    message: result
                }
            }
        } catch (error) {
            ctx.throw(400, error, { id: id });
        }
    }
    addProductController = async (ctx) => {
        try {
            const result = await this.productApi.addApi({ ...ctx.request.body });
            ctx.body = {
                status: "success",
                message: result
            }
        } catch (error) {
            if (error.code === 11000) {
                ctx.throw(400, 'Duplicated entry ');
            }
            ctx.throw(error);
        }
    }
    updProductController = async (ctx) => {
        try {
            const id = ctx.params.id;
            const result = await this.productApi.updateByIdApi(id, { ...ctx.request.body });
            ctx.body = {
                status: "success",
                message: result
            }
        } catch (error) {
            ctx.status = 400;
            ctx.body = {
                status: "error",
                message: error.message
            }
        }

    }
    deleteProductController = async (ctx) => {
        try {
            const id = ctx.params.id;
            const deletedProd = await this.productApi.deleteByIdApi(id);
            ctx.body = {
                status: "success",
                message: deletedProd
            }
        } catch (error) {
            ctx.status = 400;
            ctx.body = {
                status: "error",
                message: error.message
            }
        }
    }

}
export default ProductController;