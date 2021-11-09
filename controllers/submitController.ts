import { RouterContext } from '@koa/router';
import Joi from 'joi';
import { Report } from '../entities/Report';
import ORM from '../lib/orm';

export async function get(ctx: RouterContext): Promise<void> {
	ctx.throw(501);
}

const schema = Joi.object({
	size: Joi.number().integer().min(1).max(10).required(),
	location: Joi.string().required(),
	address: Joi.string().required()
});

export async function post(ctx: RouterContext): Promise<void> {
	const body: Record<string, string> = await schema.validateAsync(ctx.request.body);
	const repo = ORM.em.getRepository(Report);
	const report = repo.create(body);
	await repo.persistAndFlush(report);
	ctx.status = 201;
	ctx.body = `Report #${report.id} has been created!`;
}
