const Koa = require('koa');
const Router = require('koa-router');
const {productsBySubcategory, productList, productById} = require('./controllers/products');
const {categoryList} = require('./controllers/categories');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {error: err.message};
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = {error: 'Internal server error'};
    }
  }
});

const router = new Router({prefix: '/api'});

async function handleMongoIDCastError(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.name === 'CastError') {
      ctx.status = 400;
      ctx.body = 'Invalid id';
    } else {
      throw err;
    }
  }
}

router.get('/categories', categoryList);
router.get('/products', productsBySubcategory, productList);
router.get('/products/:id', handleMongoIDCastError, productById);

app.use(router.routes());

module.exports = app;
