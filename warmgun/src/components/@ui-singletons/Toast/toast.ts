import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

type ToastPreset = 'success' | 'warning' | 'error';

const toastPresetStyles = {
	success: `variant-ghost-success`,
	warning: `variant-ghost-warning`,
	error: `variant-ghost-error`
};

export function triggerToast(preset: ToastPreset, message: string): void {
	const t: ToastSettings = {
		message,
		background: toastPresetStyles[preset],
		autohide: true,
		timeout: 3000
	};
	toastStore.trigger(t);
}
