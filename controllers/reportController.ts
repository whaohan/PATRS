import { RouterContext } from '@koa/router';
import jwt from '../lib/jwt';
import Report from '../models/Report';

export async function get(ctx: RouterContext): Promise<void> {
	const { user } = await jwt.interpret(<string>ctx.cookies.get('token'))
		.catch((error) => ctx.throw(401, 'Report: ' + error.message));
	const reports = await Report.list(user);
	ctx.status = 200;
	return ctx.render('index', {reports: reports});
}
