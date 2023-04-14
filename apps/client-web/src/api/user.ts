import { api } from '$lib/clients/api-client';
import type { BlogerUser, User } from '$lib/types/api';

export async function findTopUsers() {
	return await api.get(`api/users/top?take=${10}`).json<User[]>();
}

export async function findMe() {
	return await api.get(`api/users/me`).json<User>();
}

export async function findOneUser(username: string) {
	return await api.get(`api/users/${username}`).json<BlogerUser>();
}

export async function updateMyProfile(updateMyProfileDto: UpdateMyProfileDto) {
	return await api.put(`api/users/me/profile`, { json: updateMyProfileDto });
}

export async function deleteMe() {
	return await api.delete(`api/users/me`);
}

export async function follow(id: number) {
	return await api.post(`api/users/${id}/follows`);
}

export async function unfollow(id: number) {
	return await api.delete(`api/users/${id}/follows`);
}

interface UpdateMyProfileDto {
	nickname: string;
	bio: string;
	avatar: string | null;
}
