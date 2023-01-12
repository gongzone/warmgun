interface Avatar {
	name: string;
	url: string;
	equipped: boolean;
}

export type CurrentUser = {
	id: number;
	username: string;
	email: string;
	role: string;
	character: {
		name: string;
		levle: number;
		avatars: Avatar[];
	};
} | null;
