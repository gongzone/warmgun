import { api } from '$lib/clients/api-client';

export async function signup(signupDto: SignupDto) {
	return await api.post('api/auth/signup', { json: signupDto });
}

export async function login(loginDto: LoginDto) {
	return await api.post('api/auth/login', { json: loginDto });
}

export async function logout() {
	return await api.post('api/auth/logout');
}

export interface SignupDto {
	username: string;
	password: string;
	confirm: string;
	email: string;
}

export interface LoginDto {
	username: string;
	password: string;
}
