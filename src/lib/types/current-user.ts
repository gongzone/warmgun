export type CurrentUser = {
	id: number;
	username: string;
	email: string;
	role: string;
	character: {
		name: string;
		levle: number;
	};
} | null;
