import api from '$lib/api-client';

export async function signup(signupDTO: SignupDTO) {
	return await api.post('api/auth/signup', { json: signupDTO }).json<AuthResult>();
}

export async function login(loginDTO: LoginDTO) {
	return await api.post('api/auth/login', { json: loginDTO }).json<AuthResult>();
}

export async function refresh() {
	return await api
		.post('api/auth/refresh', {
			retry: 0
		})
		.json<AuthResult>();
}

export interface SignupDTO {
	username: string;
	password: string;
	confirm: string;
	email: string;
}

export interface LoginDTO {
	username: string;
	password: string;
}

interface AuthResult {
	tokenId: number;
	accessToken: string;
	refreshToken: string;
}
