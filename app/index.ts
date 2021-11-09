import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-body';
import helmet from 'koa-helmet';
import staticServer from 'koa-static';
import router from '../routes';

const app = new Koa();

app.use(cors()); // Allow CORS (Cross-Origin Resource Sharing)
app.use(helmet()); // Provide security headers
app.use(bodyParser({ multipart: true })); // Resolve request body
app.use(staticServer('static')); // Access static resources
app.use(router.routes()); // Set up the router

export default app;
