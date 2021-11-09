import { randomBytes } from 'crypto';
import { JwtPayload, sign as signJWT, SignOptions, verify } from 'jsonwebtoken';
import * as options from './options';

const issuer = process.env.JWT_ISSUER;
const secret = process.env.JWT_SECRET ?? randomBytes(16).toString('hex');

/**
 * Sign a JWT token
 * @param {object} content Token content
 * @param {SignOptions} options Token signing options
 * @returns {string} JWT token
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function sign(content: object, options: SignOptions): string {
	return signJWT(content, secret, Object.assign({ issuer }, options));
}

/**
 * Interpret a JWT token
 * @param {string} token JWT token
 * @returns {JwtPayload} Token content
 * @throws {JsonWebTokenError} Error when interpreting
 */
function interpret(token: string): JwtPayload {
	return <JwtPayload>verify(token, secret, { issuer });
}

export default { sign, interpret, options };
