import { RouterContext } from '@koa/router';
import Joi from 'joi';
import { User } from '../entities/User';
import jwt from '../lib/jwt';
import ORM from '../lib/orm';

export async function get(ctx: RouterContext): Promise<void> {
	ctx.throw(501);
}

const schema = Joi.object({
	id: Joi.string().required(),
	password: Joi.string().required()
});

export async function post(ctx: RouterContext): Promise<void> {
	const body: Record<string, string> = await schema.validateAsync(ctx.request.body);
	const repo = ORM.em.getRepository(User);
	const user = await repo.findOne(body.id);
	if (user !== null && user.authenticate(body.password)) {
		ctx.status = 200;
		ctx.body = jwt.sign({ user: body.id }, jwt.options.session);
	} else
		ctx.throw(403, 'ID or password is incorrect!');
	ctx.throw(501);
}
