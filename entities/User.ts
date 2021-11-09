import { Entity, PrimaryKey, PrimaryKeyType, Property } from '@mikro-orm/core';
import { BinaryLike, createHash } from 'crypto';

const encrypt = (content: BinaryLike) => createHash('sha256').update(content).digest('hex');

@Entity()
export class User {
	[PrimaryKeyType]: User['id']

	@PrimaryKey()
	id!: string;

	@Property({ hidden: true })
	authentication!: string;

	@Property({ persist: false })
	set password(value: string) {
		this.authentication = encrypt(value);
	}

	authenticate(password: string): boolean {
		return this.authentication === encrypt(password);
	}
}
