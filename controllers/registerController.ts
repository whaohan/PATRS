import { RouterContext } from '@koa/router';
import Joi from 'joi';
import { User } from '../entities/User';
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
	if (user !== null)
		ctx.throw(403, 'The id has been taken!');
	await repo.persistAndFlush(repo.create(body));
	ctx.status = 201;
	ctx.body = `User ${body.id} has been created!`;
}
