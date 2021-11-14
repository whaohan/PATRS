import { RouterContext } from '@koa/router';
import Joi from 'joi';
import jwt from '../lib/jwt';
import User from '../models/User';

const schema = Joi.object({
	id: Joi.string().required(),
	password: Joi.string().required()
});

export async function get(ctx: RouterContext): Promise<void> {
	await ctx.render('login');
}

export async function post(ctx: RouterContext): Promise<void> {
	const { id, password } = await schema.validateAsync(ctx.request.body)
		.catch((error) => ctx.throw(400, error.details));
	if (await User.login(id, password)) {
		ctx.status = 200;
		ctx.body = { id, token: jwt.sign({ user: id }, jwt.options.session) };
	} else {
		ctx.status = 403;
		ctx.body = 'ID or password is wrong!';
	}
}
