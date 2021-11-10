import { Report } from '../entities/Report';
import ORM from '../lib/orm';

async function list(user?: string, limit?: number, offset?: number): Promise<Report[]> {
	const repo = ORM.em.getRepository(Report);
	const options: Record<string, number> = {};
	if (limit !== undefined) options.limit = limit;
	if (offset !== undefined) options.offset = offset;
	if (user === undefined)
		return await repo.findAll(options);
	else
		return await repo.find({ user }, options);
}

async function create(user: string, size: number, location: string, address: string): Promise<Report> {
	const repo = ORM.em.getRepository(Report);
	const report = repo.create({ user, size, location, address });
	await repo.persistAndFlush(report);
	return report;
}

export default { list, create };
