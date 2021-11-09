import { Entity, Enum, PrimaryKey, PrimaryKeyType, Property } from '@mikro-orm/core';

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

	@Enum()
	status: ReportStatus = ReportStatus.PENDING;
}

export enum ReportStatus {
	PENDING,
	ASSIGNED,
	REPAIRED
}
