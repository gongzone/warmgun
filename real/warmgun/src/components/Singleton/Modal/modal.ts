import { modalStore } from '@skeletonlabs/skeleton';
import type { ModalSettings } from '@skeletonlabs/skeleton';

export function triggerComponentModal(preset: 'AuthModal'): void {
	const component: ModalSettings = {
		type: 'component',
		component: preset
	};
	modalStore.trigger(component);
}
