<script lang="ts">
	import '../../styles/editor.postcss';

	import { onMount, onDestroy } from 'svelte';
	import EditorJS, { type OutputData } from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import Quote from '@editorjs/quote';
	import Alert from 'editorjs-alert';
	import NestedList from '@editorjs/nested-list';
	import ImageTool from '@editorjs/image';
	import Marker from '@editorjs/marker';
	import Underline from '@editorjs/underline';
	import InlineCode from '@editorjs/inline-code';

	import AutosizedTextarea from '$components/@base/Input/AutoSizedTextarea.svelte';
	import { uploadImage } from '$api/image';

	export let editor: EditorJS | null;
	export let title: string;
	export let subTitle: string;
	export let body: string;

	let isEditorReady = false;

	$: if (isEditorReady && editor) {
		editor.render(
			body
				? JSON.parse(body)
				: ({
						time: new Date().getTime(),
						blocks: [
							{
								type: 'paragraph',
								data: {
									text: ''
								}
							}
						],
						version: '2.26.5'
				  } satisfies OutputData)
		);
	}

	onMount(() => {
		editor = new EditorJS({
			holder: 'editor',
			placeholder: '당신의 이야기를 들려주세요.',
			tools: {
				header: {
					class: Header,
					inlineToolbar: true,
					config: {
						placeholder: 'Enter a header',
						levels: [2, 3, 4],
						defaultLevel: 2
					}
				},
				quote: {
					class: Quote,
					inlineToolbar: true
				},
				alert: {
					class: Alert,
					inlineToolbar: true,
					shortcut: 'CMD+SHIFT+A',
					config: {
						defaultType: 'primary',
						messagePlaceholder: 'Enter something'
					}
				},
				list: {
					class: NestedList,
					inlineToolbar: true,
					config: {
						defaultStyle: 'unordered'
					}
				},
				image: {
					class: ImageTool,
					config: {
						uploader: {
							uploadByFile(file: File) {
								return uploadImage(file)
									.then((imageUrl) => ({
										success: 1,
										file: {
											url: imageUrl
										}
									}))
									.catch(() =>
										Promise.resolve({
											success: 0
										})
									);
							}
						}
					}
				},
				Marker: {
					class: Marker
				},
				inlineCode: {
					class: InlineCode
				},
				underline: {
					class: Underline
				}
			},
			onReady: () => {
				isEditorReady = true;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
			editor = null;
		}
	});
</script>

<div class="space-y-4">
	<div>
		<AutosizedTextarea name="title" placeholder="제목을 입력하세요" bind:value={title} size="lg" />
		<AutosizedTextarea
			name="subTitle"
			placeholder="소제목을 입력하세요"
			bind:value={subTitle}
			size="md"
		/>
	</div>

	<div class="px-[0.75rem]">
		<hr />
	</div>

	<div id="editor" class="px-[0.75rem]" />
</div>
