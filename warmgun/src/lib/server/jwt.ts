import { createSigner, createVerifier, createDecoder } from 'fast-jwt';
import { JWT_ACCESS_KEY, JWT_REFRESH_KEY } from '$env/static/private';

export type TokenMode = 'access' | 'refresh';

export interface TokenPayload {
	userId: number;
	username: string;
}

export interface TokenPayloadRetun extends TokenPayload {
	iat: number;
	exp: number;
}

export const tokenExpires = {
	access: 1000 * 60 * 10, // 10s
	refresh: 1000 * 60 * 60 * 24 * 7 // 7d
} as const;

export async function generateTokens(payload: TokenPayload): Promise<{
	accessToken: string;
	refreshToken: string;
}> {
	const [accessToken, refreshToken] = await Promise.all([
		generateToken('access', payload),
		generateToken('refresh', payload)
	]);

	return { accessToken, refreshToken };
}

export async function verifyToken(
	mode: TokenMode,
	token: string
): Promise<TokenPayloadRetun | null> {
	const verifier = createVerifier({
		key: async () => (mode === 'access' ? JWT_ACCESS_KEY : JWT_REFRESH_KEY),
		cache: 1000
	});

	try {
		const payload: TokenPayloadRetun = await verifier(token);
		return payload;
	} catch (err) {
		return null;
	}
}

export async function decodeToken(token: string): Promise<TokenPayloadRetun> {
	const decoder = createDecoder();

	const payload: TokenPayloadRetun = decoder(token);
	return payload;
}

async function generateToken(mode: TokenMode, payload: TokenPayload): Promise<string> {
	const signer = createSigner({
		key: async () => (mode === 'access' ? JWT_ACCESS_KEY : JWT_REFRESH_KEY),
		expiresIn: tokenExpires[mode]
	});

	const token = await signer(payload);
	return token;
}
