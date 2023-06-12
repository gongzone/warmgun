import type { EditorConfig } from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import NestedList from '@editorjs/nested-list';
import ImageTool from '@editorjs/image';
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';
import CodeTool from '@editorjs/code';

import { uploadImage } from '$lib/client-fetch/upload-image';

export const editorTools = {
	/* Block Tools */
	paragraph: {
		class: Paragraph,
		inlineToolbar: true,
		config: { preserveBlank: true }
	},
	code: CodeTool,
	header: {
		class: Header,
		inlineToolbar: true,
		config: { placeholder: '제목을 입력하세요.', levels: [1, 2, 3], defaultLevel: 2 }
	},
	list: {
		class: NestedList,
		inlineToolbar: true,
		config: { defaultStyle: 'unordered' }
	},
	quote: {
		class: Quote,
		inlineToolbar: true,
		config: {
			quotePlaceholder: '인용구를 입력하세요.'
		}
	},
	image: {
		class: ImageTool,
		config: {
			uploader: {
				uploadByFile(file: File) {
					return uploadImage(file)
						.then((imageUrl) => ({ success: 1, file: { url: imageUrl } }))
						.catch(() => Promise.resolve({ success: 0 }));
				}
			}
		}
	},
	/* Inline Tools */
	underline: { class: Underline },
	marker: { class: Marker }
} satisfies EditorConfig['tools'];

export const editorTunes = [];
