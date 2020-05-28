const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

let subscriptions = [];

router.get('/subscribe', async (ctx, next) => {
  return new Promise((resolve) => {
    subscriptions.push(resolve);
  }).then((message) => {
    ctx.body = message;
  });
});

router.post('/publish', async (ctx, next) => {
  const message = ctx.request.body.message;

  if (message) {
    subscriptions.forEach((resolve) => resolve(message));
    subscriptions = [];
  }

  ctx.status = 200;
});

app.use(router.routes());

module.exports = app;
