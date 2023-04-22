import { api } from '$lib/clients/api-client';
import type { BlogerUser, PaginationData, User } from '$lib/types/api';
import type { QueryFunctionContext } from '@tanstack/svelte-query';

export async function findTopUsers() {
	return await api.get(`api/users/top?take=${10}`).json<User[]>();
}

export async function findMyFollowingUsers({ pageParam = 0 }: QueryFunctionContext) {
	return await api
		.get(`api/users/me/follows?take=${10}&cursor=${pageParam}`)
		.json<PaginationData<User>>();
}

export async function findMe(fetch?: any) {
	return await api.get(`api/users/me`, { fetch }).json<User | null>();
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
