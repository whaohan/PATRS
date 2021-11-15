import { RouterContext } from '@koa/router';
import Joi from 'joi';
import jwt from '../lib/jwt';
import Report from '../models/Report';

const schema = Joi.object({
	size: Joi.number().integer().min(1).max(10).required(),
	location: Joi.string().required(),
	address: Joi.string().required()
});

export async function get(ctx: RouterContext): Promise<void> {
	return jwt.interpret(<string>ctx.cookies.get('token'))
		.then(() => ctx.render('submit'))
		.catch(() => ctx.redirect('/login'));
}

export async function post(ctx: RouterContext): Promise<void> {
	const { size, location, address } = await schema.validateAsync(ctx.request.body)
		.catch((error) => ctx.throw(400, error.details));
	return jwt.interpret(<string>ctx.cookies.get('token'))
		.then(async ({ user }) => {
			await Report.create(user, size, location, address);
			ctx.redirect('/');
		})
		.catch(() => ctx.redirect('/login'));
}
