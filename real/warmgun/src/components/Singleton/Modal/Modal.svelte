<script lang="ts">
	import { Modal, type ModalComponent } from '@skeletonlabs/skeleton';

	import AuthModal from './_AuthModal/AuthModal.svelte';

	const modalComponentRegistry: Record<string, ModalComponent> = {
		AuthModal: {
			ref: AuthModal
		}
	};
</script>

<Modal components={modalComponentRegistry} />
