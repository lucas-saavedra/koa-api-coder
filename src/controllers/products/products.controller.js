import ProductsApi from "../../api/products.api.js";

class ProductController {
    constructor() {
        this.productApi = new ProductsApi()
    }
    getProductsController = async (ctx, next) => {
        try {
            let result;

            if (ctx.params.id) {
                const id = ctx.params.id;
                result = await this.productApi.getByIdApi(id);
                console.log(result);
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
            ctx.error = error.message;
            await next();
        }
    }
    addProductController = async (ctx,next) => {
        try {
            const result = await this.productApi.addApi({ ...ctx.request.body });
            ctx.body = {
                status: "success",
                message: result
            }
        } catch (error) {
            if (error.code === 11000) {
                ctx.error = 'Duplicated entry';
            }
            ctx.error = error.message;
            await next();
        }
    }
    updProductController = async (ctx,next) => {
        try {
            const id = ctx.params.id;
            const result = await this.productApi.updateByIdApi(id, { ...ctx.request.body });
            ctx.body = {
                status: "success",
                message: result
            }
        } catch (error) {
            ctx.error = error.message;
            await next();
        }

    }
    deleteProductController = async (ctx,next) => {
        try {
            const id = ctx.params.id;
            const deletedProd = await this.productApi.deleteByIdApi(id);
            ctx.body = {
                status: "success",
                message: deletedProd
            }
        } catch (error) {
            ctx.error = error.message;
            await next();
        }
    }

}
export default ProductController;