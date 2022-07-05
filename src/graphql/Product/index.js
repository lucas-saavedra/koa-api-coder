import ProductsApi from "../../api/products.api.js";
import { buildSchema } from 'graphql';

const api = new ProductsApi();
const ProductResolvers = {
    getProducts: async () => {
        const products = await api.getAllApi();
        return Object.values(products);
    },
    getProduct: async ({ _id }) => {
        const product = await api.getByIdApi(_id);
        return product;
    },
    createProduct: async ({ data }) => {
        const productAdded = await api.addApi(data);
        return productAdded;
    },
    updateProduct: async ({ id, data }) => {
        const updatedProduct = await api.updateByIdApi(id, data);
        return updatedProduct;
    },
    deleteProduct: async ({ id }) => {
        const deletedProduct = await api.deleteByIdApi(id);
        return deletedProduct;
    }

}

const ProductSchema = buildSchema(`
    type Producto {
        _id: ID!
        titulo: String, ,
        descripcion:String ,
        foto:  String ,
        codigo:  String!, 
        precio: Float!,
        stock: Int!
    }
    input ProductoInput {
        titulo: String, ,
        descripcion:String,
        foto:  String ,
        codigo:  String, 
        precio: Float,
        stock: Int
    }

    type Query {
        getProduct(_id: ID!): Producto,
        getProducts: [Producto]!
    }

    type Mutation {
        createProduct(data : ProductoInput): Producto,
        updateProduct(id:ID!,data: ProductoInput):Producto,
        deleteProduct(id:ID!):Producto
    }
`);


export { ProductResolvers, ProductSchema };