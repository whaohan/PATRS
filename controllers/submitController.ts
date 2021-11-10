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
	ctx.throw(501);
}

export async function post(ctx: RouterContext): Promise<void> {
	const { size, location, address } = await schema.validateAsync(ctx.request.body)
		.catch((error) => ctx.throw(400, error.details));
	const { user } = await jwt.interpret(<string>ctx.headers.authorization)
		.catch((error) => ctx.throw(401, error.message));
	const report = await Report.create(user, size, location, address);
	ctx.status = 201;
	ctx.body = `Report #${report.id} has been created!`;
}
