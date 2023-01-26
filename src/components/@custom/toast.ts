import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

export default function triggerToast(message: string, preset: ToastSettings['preset']): void {
	const t: ToastSettings = {
		message,
		preset,
		autohide: true,
		timeout: 3000
	};
	toastStore.trigger(t);
}
