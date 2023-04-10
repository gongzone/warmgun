import { api } from '$lib/clients/api-client';
import type { User } from '$lib/types/api';

type UserFindAllMode = 'top';

export async function findAllUsers({ mode }: { mode: UserFindAllMode }) {
	return await api.get(`api/users?mode=${mode}`).json<User[]>();
}

export async function findMe() {
	return await api.get(`api/users/me`).json<User>();
}

export async function findOne(username: string) {
	return await api.get(`api/users/${username}`).json<User>();
}
