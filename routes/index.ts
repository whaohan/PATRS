import Router from '@koa/router';
import * as reportController from '../controllers/reportController';
import * as loginController from '../controllers/loginController';
import * as registerController from '../controllers/registerController';
import * as submitController from '../controllers/submitController';

const router = new Router();

/** Routing entries in order of execution */
router.get('/', reportController.get);
router.get('/login', loginController.get);
router.post('/login', loginController.post);
router.get('/register', registerController.get);
router.post('/register', registerController.post);
router.get('/submit', submitController.get);
router.post('/submit', submitController.post);

router.use((ctx) => { ctx.throw(404); });

export default router;
