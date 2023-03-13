const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			extend: {
				fontFamily: {
					sans: ['Noto Sans KR', ...defaultTheme.fontFamily.sans],
					serif: ['Noto Serif KR', ...defaultTheme.fontFamily.serif],
					logo: ['Concert One', ...defaultTheme.fontFamily.sans]
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/line-clamp'),
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
	]
};
