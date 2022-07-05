import Koa from 'koa';
import koaBody from 'koa-body';
import mount from 'koa-mount';
import { graphqlHTTP } from 'koa-graphql';
import { ProductResolvers, ProductSchema } from './graphql/Product/index.js';
import router from './routers/app.routes.js';
const app = new Koa();
app.use(koaBody());
app.use(router.routes());
app.use((ctx) => {
    ctx.status = 400;
    ctx.body = {
        status: "error",
        message: ctx.error
    }
})
app.use(
    mount(
        '/graphql',
        graphqlHTTP({
            schema: ProductSchema,
            graphiql: true,
            rootValue: ProductResolvers
        }),
    ),
);


export default app;