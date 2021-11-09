import { Entity, PrimaryKey, PrimaryKeyType, Property } from '@mikro-orm/core';

@Entity()
export class Report {
	[PrimaryKeyType]: Report['id']

	@PrimaryKey()
	id!: number;

	@Property()
	size!: number;

	@Property()
	location!: string;

	@Property()
	address!: string;

	@Property()
	status!: number;
}
