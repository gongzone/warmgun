<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
  import { FileDropzone } from '@skeletonlabs/skeleton';

  let files: FileList;

  $: files ? console.log(files) : null
</script>

<p>아바타 생성</p>

<form 
  method="POST" 
  action="?/new" 
  enctype="multipart/form-data" 
  use:enhance>
  <FileDropzone name="avatar" title="Upload your Attachment here." notes="Files should not exceed 5mb." bind:files  />
  <button class="btn bg-primary-500">생성하기</button>
</form>