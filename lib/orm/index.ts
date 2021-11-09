import { EntityManager, MikroORM } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

class ORM {
	private static instance?: MikroORM

	static async init(): Promise<void> {
		const orm = await MikroORM.init({
			metadataProvider: TsMorphMetadataProvider,
			entities: ['./entities']
		});
		const migrator = orm.getMigrator();
		const initialized = (await migrator.getExecutedMigrations()).length + (await migrator.getPendingMigrations()).length;
		if (!initialized)
			await migrator.createInitialMigration();
		else
			await migrator.createMigration();
		await migrator.up();
		ORM.instance = orm;
	}

	static get orm(): MikroORM {
		if (ORM.instance === undefined)
			throw new Error('ORM is not initialized!');
		return ORM.instance;
	}

	static get em(): EntityManager {
		return ORM.orm.em;
	}
}

export default ORM;
