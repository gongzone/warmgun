import { JWT_SECRET_KEY } from '$env/static/private';
import { createSigner, createVerifier, TokenError } from 'fast-jwt';

const SECRET_KEY = JWT_SECRET_KEY;

if (!SECRET_KEY) {
	console.warn('JWT_SECRET_KEY is not defined in .env file');
}

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokensDuration = {
	[ACCESS_TOKEN_KEY]: 1000 * 60 * 10,
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

export async function generateTokens(userId: number) {
	const [accessToken, refreshToken] = await Promise.all([
		generateToken({
			type: ACCESS_TOKEN_KEY,
			userId
		}),
		generateToken({
			type: REFRESH_TOKEN_KEY,
			userId
		})
	]);

	return { accessToken, refreshToken };
}

export async function verifyToken(token: string) {
	const verifyWithPromise = createVerifier({
		key: async () => JWT_SECRET_KEY,
		cache: 1000
	});

	try {
		const payload: TokenPayload = await verifyWithPromise(token);
		return payload;
	} catch (err) {
		if (err instanceof TokenError) {
			return null;
		}
	}
}

export interface TokenPayload {
	type: typeof ACCESS_TOKEN_KEY | typeof REFRESH_TOKEN_KEY;
	userId: number;
}
