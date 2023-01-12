export type AvatarEnums = 'LABRADOR' | 'MONKEY';

export const defaultAvatars = {
	LABRADOR: {
		name: '멍멍이',
		url: '/avatars/labrador.svg'
	},
	MONKEY: {
		name: '원숭이',
		url: '/avatars/monkey.svg'
	}
};

export const allAvatars = {
	...defaultAvatars
};
