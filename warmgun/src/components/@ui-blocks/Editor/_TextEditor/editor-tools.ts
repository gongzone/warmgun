import type { EditorConfig } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import NestedList from '@editorjs/nested-list';
import ImageTool from '@editorjs/image';
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';
import InlineCode from '@editorjs/inline-code';

export const editorTools = {
	header: {
		class: Header,
		inlineToolbar: true,
		config: { placeholder: 'Enter a header', levels: [2, 3, 4], defaultLevel: 2 }
	},
	list: {
		class: NestedList,
		inlineToolbar: true,
		config: { defaultStyle: 'unordered' }
	},
	quote: { class: Quote, inlineToolbar: true },
	Marker: { class: Marker },
	inlineCode: { class: InlineCode },
	underline: { class: Underline },
	image: { class: ImageTool }
	// alert: {
	// 	class: Alert,
	// 	inlineToolbar: true,
	// 	shortcut: 'CMD+SHIFT+A',
	// 	config: {
	// 		defaultType: 'primary',
	// 		messagePlaceholder: 'Enter something'
	// 	}
	// },

	// image: {
	// 	class: ImageTool
	// config: {
	// 	uploader: {
	// 		uploadByFile(file: File) {
	// 			return uploadImage(file)
	// 				.then((imageUrl) => ({
	// 					success: 1,
	// 					file: {
	// 						url: imageUrl
	// 					}
	// 				}))
	// 				.catch(() =>
	// 					Promise.resolve({
	// 						success: 0
	// 					})
	// 				);
	// 		}
	// 	}
	// }
	// }
} satisfies EditorConfig['tools'];
