import { SignOptions } from 'jsonwebtoken';

export const action: SignOptions = { algorithm: 'HS256', expiresIn: '15min' };
export const refresh: SignOptions = { algorithm: 'HS256', expiresIn: '7d' };
export const session: SignOptions = { algorithm: 'HS256', expiresIn: '2h' };
