import { api } from '$lib/clients/api-client';
import type { User } from '$lib/types/api';

export async function findAllUsers({ mode }: { mode: UserFindAllMode }) {
	return await api.get(`api/users?mode=${mode}`).json<User[]>();
}

export async function findMe() {
	return await api.get(`api/users/me`).json<User>();
}

export async function findOneUser(username: string) {
	return await api.get(`api/users/${username}`).json<User>();
}

type UserFindAllMode = 'top';
