/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	corePlugins: {
		container: false
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
		function ({ addComponents }) {
			addComponents({
				'.container': {
					paddingRight: '1rem',
					paddingLeft: '1rem',
					maxWidth: '100%',
					'@screen sm': {
						paddingRight: '2rem',
						paddingLeft: '2rem'
					},
					'@screen md': {},
					'@screen lg': {},
					'@screen xl': {
						maxWidth: '1400px',
						marginLeft: 'auto',
						marginRight: 'auto'
					}
				}
			});
		}
	]
};
