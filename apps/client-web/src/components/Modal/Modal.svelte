<script lang="ts">
	import { Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import EditProfileModal from './EditProfileModal/EditProfileModal.svelte';

	const modalComponentRegistry: Record<string, ModalComponent> = {
		// Custom Modal 1
		editProfileModal: {
			// Pass a reference to your custom component
			ref: EditProfileModal
		}
	};
</script>

<Modal components={modalComponentRegistry} />
