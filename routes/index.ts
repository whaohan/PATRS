import Router from '@koa/router';

const router = new Router();

/** Routing entries in order of execution */
router.get('/', (ctx) => { ctx.body = 'It works!'; });
router.use((ctx) => { ctx.throw(404); });

export default router;
