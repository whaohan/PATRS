import { RouterContext } from '@koa/router';
import Joi from 'joi';
import User from '../models/User';

const schema = Joi.object({
	id: Joi.string().required(),
	password: Joi.string().required()
});

export async function get(ctx: RouterContext): Promise<void> {
	await ctx.render('register', {message: ''});
}

export async function post(ctx: RouterContext): Promise<void> {
	const { id, password } = await schema.validateAsync(ctx.request.body)
		.catch((error) => ctx.throw(400, error.details));
	if (await User.register(id, password)) {
		ctx.response.redirect('/login'); 
	} else {
		await ctx.render('register', {message: 'User ID has been occupied!'});
	}
}
