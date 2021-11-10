import { Entity, Enum, ManyToOne, PrimaryKey, PrimaryKeyType, Property } from '@mikro-orm/core';
import { User } from './User';

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

	@ManyToOne()
	user!: User

	@Enum()
	status: ReportStatus = ReportStatus.PENDING;
}

export enum ReportStatus {
	PENDING,
	ASSIGNED,
	REPAIRED
}
