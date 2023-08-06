import { CodeBlock, type CodeBlockOptions } from './code-block-base';

import { LowlightPlugin } from './code-block-plugin';

export interface CodeBlockLowlightOptions extends CodeBlockOptions {
	lowlight: any;
	defaultLanguage: string | null | undefined;
}

export const CodeBlockLowlight = CodeBlock.extend<CodeBlockLowlightOptions>({
	addOptions() {
		return {
			...this.parent?.(),
			lowlight: {},
			defaultLanguage: null
		};
	},

	addProseMirrorPlugins() {
		return [
			...(this.parent?.() || []),
			LowlightPlugin({
				name: this.name,
				lowlight: this.options.lowlight,
				defaultLanguage: this.options.defaultLanguage
			})
		];
	}
});