import type { AvatarEnums } from '$lib/character/avatar';
import type { ClassEnums } from '$lib/character/class';

export type CurrentUser = {
	id: number;
	username: string;
	email: string;
	role: string;
	character: {
		name: string;
		level: number;
		class: ClassEnums;
		mainAvatar: AvatarEnums;
		avatars: AvatarEnums[];
	};
} | null;
