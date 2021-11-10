import { User } from '../entities/User';
import ORM from '../lib/orm';

async function login(id: string, password: string): Promise<boolean> {
	const repo = ORM.em.getRepository(User);
	const user = await repo.findOne(id);
	return user !== null && user.authenticate(password);
}

async function register(id: string, password: string): Promise<boolean> {
	const repo = ORM.em.getRepository(User);
	const user = await repo.findOne(id);
	if (user === null)
		await repo.persistAndFlush(repo.create({ id, password }));
	return user === null;
}

export default { login, register };
