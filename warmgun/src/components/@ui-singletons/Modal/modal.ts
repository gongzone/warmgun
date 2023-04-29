import { modalStore } from '@skeletonlabs/skeleton';
import type { ModalSettings } from '@skeletonlabs/skeleton';

export function triggerConfirmModal(
	title: string,
	body: string,
	response: (r: boolean) => void
): void {
	const confirm: ModalSettings = {
		type: 'confirm',
		title,
		body,
		response
	};
	modalStore.trigger(confirm);
}

export function triggerComponentModal(
	preset: 'editProfileModal',
	meta: ModalSettings['meta']
): void {
	const component: ModalSettings = {
		type: 'component',
		component: preset,
		meta
	};
	modalStore.trigger(component);
}
