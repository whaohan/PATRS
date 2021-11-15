import { RouterContext } from '@koa/router';
import jwt from '../lib/jwt';
import Report from '../models/Report';

export async function get(ctx: RouterContext): Promise<void> {
	return jwt.interpret(<string>ctx.cookies.get('token'))
		.then(async ({ user }) => {
			const reports = await Report.list(user);
			return ctx.render('index', {reports: reports});
		})
		.catch(() => ctx.redirect('/login'));
}
