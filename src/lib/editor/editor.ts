import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight-ssr';

export const editorConfig = {
	autofocus: true
};

export const plugins = [gfm(), highlight()];
