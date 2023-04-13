import { api } from '$lib/clients/api-client';
import type { User } from '$lib/types/api';

export async function findTopUsers() {
	return await api.get(`api/users/top?take=${10}`).json<User[]>();
}

export async function findMe() {
	return await api.get(`api/users/me`).json<User>();
}

export async function findOneUser(username: string) {
	return await api.get(`api/users/${username}`).json<User>();
}

export async function updateMyProfile(updateMyProfileDto: UpdateMyProfileDto) {
	return await api.put(`api/users/me/profile`, { json: updateMyProfileDto });
}

interface UpdateMyProfileDto {
	nickname: string;
	bio: string;
	avatar: string | null;
}
