import { RouterContext } from '@koa/router';
import logger from '../lib/logger';
import jwt from '../lib/jwt';
import Report from '../models/Report';

export async function get(ctx: RouterContext): Promise<void> {
	logger.debug('At /');
	logger.debug(ctx.cookies.get('token'));
	return jwt.interpret(<string>ctx.cookies.get('token'))
		.then(async ({ user }) => {
			const reports = await Report.list(user);
			return ctx.render('index', { reports: reports });
		})
		.catch((error) => {
			logger.error(error);
			ctx.redirect('/login');
		});
}
