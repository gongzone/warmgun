import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

type ToastPreset = 'success' | 'warning' | 'error';

export function triggerToast(message: string, preset: ToastPreset): void {
	const t: ToastSettings = {
		message,
		background: `variant-filled-${preset}`,
		autohide: true,
		timeout: 3000
	};
	toastStore.trigger(t);
}
