import { modalStore } from '@skeletonlabs/skeleton';
import type { ModalSettings } from '@skeletonlabs/skeleton';

export function triggerConfirmModal(
	title: string,
	body: string,
	response: (confirm: boolean) => void
): void {
	const confirm: ModalSettings = {
		type: 'confirm',
		title,
		body,
		buttonTextCancel: '취소',
		buttonTextConfirm: '확인',
		response
	};
	modalStore.trigger(confirm);
}
