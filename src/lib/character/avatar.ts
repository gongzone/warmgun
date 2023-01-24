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

type AvatarEnum = keyof typeof allAvatars;

export function getAvatar(avatar: AvatarEnum | null | undefined) {
	if (!avatar) {
		return { name: null, url: '' };
	}

	return allAvatars[avatar];
}
