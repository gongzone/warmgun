import { readable, type Readable } from 'svelte/store';
import { Editor as CoreEditor, type EditorOptions } from '@tiptap/core';

export * from './extensions';

export class Editor extends CoreEditor {
	public contentElement: HTMLElement | null = null;
}

export const createEditor = (options: Partial<EditorOptions>): Readable<Editor> => {
	const editor = new Editor(options);

	const { subscribe } = readable(editor, (set) => {
		editor.on('transaction', () => {
			set(editor);
		});

		return () => {
			editor.destroy();
		};
	});

	return { subscribe };
};
