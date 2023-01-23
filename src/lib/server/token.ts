import { JWT_SECRET_KEY } from '$env/static/private';
import type { User } from '@prisma/client';
import { createSigner, createVerifier, TokenError } from 'fast-jwt';

const SECRET_KEY = JWT_SECRET_KEY;

if (!SECRET_KEY) {
	console.warn('JWT_SECRET_KEY is not defined in .env file');
}

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokensDuration = {
	[ACCESS_TOKEN_KEY]: 1000 * 10,
	[REFRESH_TOKEN_KEY]: 1000 * 60 * 60 * 24 * 7
} as const;

export async function generateToken(payload: TokenPayload) {
	const signWithPromise = createSigner({
		key: async () => JWT_SECRET_KEY,
		expiresIn: tokensDuration[payload.type]
	});

	const token = await signWithPromise(payload);
	return token;
}

export async function generateTokens(user: Pick<User, 'id' | 'username' | 'email'>) {
	const { id: userId, username, email } = user;

	const [accessToken, refreshToken] = await Promise.all([
		generateToken({
			type: ACCESS_TOKEN_KEY,
			userId,
			username,
			email
		}),
		generateToken({
			type: REFRESH_TOKEN_KEY,
			userId
		})
	]);

	return { accessToken, refreshToken };
}

export async function verifyToken<T>(token: string) {
	const verifyWithPromise = createVerifier({
		key: async () => JWT_SECRET_KEY,
		cache: 1000
	});

	try {
		const payload: T = await verifyWithPromise(token);
		return payload;
	} catch (err) {
		if (err instanceof TokenError) {
			return null;
		}
	}
}

export interface AccessTokenPayload {
	type: typeof ACCESS_TOKEN_KEY;
	userId: number;
	username: string;
	email: string;
}

export interface RefreshTokenPayload {
	type: typeof REFRESH_TOKEN_KEY;
	userId: number;
}

export type TokenPayload = AccessTokenPayload | RefreshTokenPayload;
