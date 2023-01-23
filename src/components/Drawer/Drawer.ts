import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

export const drawerIds = {
	write: 'WRITE'
};

interface Settings {
	[key: string]: DrawerSettings;
}

const settings: Settings = {
	write: {
		id: drawerIds['write'],
		position: 'left',
		bgDrawer: 'bg-surface-900',
		bgBackdrop: 'bg-surface-500/50',
		width: 'w-full',
		duration: 200
	}
};

export type DrawerKind = keyof typeof settings;

export function drawerOpen(kind: DrawerKind): void {
	const targetSetting = settings[kind];
	drawerStore.open(targetSetting);
}

export function drawerClose(): void {
	drawerStore.close();
}
