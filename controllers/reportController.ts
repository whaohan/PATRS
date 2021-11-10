import { RouterContext } from '@koa/router';
import jwt from '../lib/jwt';
import Report from '../models/Report';

export async function get(ctx: RouterContext): Promise<void> {
	const { user } = await jwt.interpret(<string>ctx.headers.authorization)
		.catch((error) => ctx.throw(401, error.message));
	const reports = await Report.list(user);
	ctx.status = 200;
	ctx.body = reports;
}
