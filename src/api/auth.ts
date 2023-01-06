import { client } from '$lib/client';

export async function login(params: LoginBody) {
	const { body } = await client.post<AuthResult>('api/auth/login', {
		json: params
	});

	return body;
}

export async function signup(params: SignupBody) {
	const { body } = await client.post<AuthResult>('api/auth/signup', {
		json: params
	});

	return body;
}

export async function refresh(params: RefreshBody) {
	console.log(`🎃 리프레시 작동!`);
	const { body } = await client.post<RefreshResult>('api/auth/refresh', {
		json: params
	});

	return body;
}

export interface LoginBody {
	username: string;
	password: string;
}

export interface SignupBody {
	username: string;
	password: string;
	confirmPassword: string;
	email: string;
}

export interface Token {
	value: string;
	config: {
		httpOnly: boolean;
		expires: string;
		path: string;
	};
}

export interface AuthResult {
	tokens: {
		accessToken: Token;
		refreshToken: Token;
	};
	user: {
		id: number;
		username: string;
		email: string;
	};
}

export interface RefreshBody {
	refreshToken: string;
}

export interface RefreshResult {
	accessToken: Token;
	refreshToken: Token;
}
