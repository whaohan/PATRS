import { RouterContext } from '@koa/router';
import { Report } from '../entities/Report';
import logger from '../lib/logger';
import ORM from '../lib/orm';

export async function get(ctx: RouterContext): Promise<void> {
	const repo = ORM.em.getRepository(Report);
	const reports = await repo.findAll({ limit: undefined, offset: undefined });
	logger.info(reports.map((report) => report.id));
	ctx.throw(501);
}
