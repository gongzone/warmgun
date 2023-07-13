// /** @type {import('tailwindcss').Config} */
// module.exports = {
// 	darkMode: 'class',
// 	content: [
// 		'./src/**/*.{html,js,svelte,ts}',
// 		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
// 	],
// 	theme: {
// 		extend: {}
// 	},
// 	corePlugins: {
// 		container: false
// 	},
// 	plugins: [
// require('@tailwindcss/forms'),
// require('@tailwindcss/typography'),
// 		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
// 		function ({ addComponents }) {
// 			addComponents({
// 				'.container': {
// 					paddingRight: '1rem',
// 					paddingLeft: '1rem',
// 					maxWidth: '100%',
// 					'@screen sm': {
// 						paddingRight: '2rem',
// 						paddingLeft: '2rem'
// 					},
// 					'@screen md': {},
// 					'@screen lg': {},
// 					'@screen xl': {
// 						maxWidth: '1400px',
// 						marginLeft: 'auto',
// 						marginRight: 'auto'
// 					}
// 				}
// 			});
// 		}
// 	]
// };

const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',

				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},

				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))'
			},
			borderRadius: {
				// lg: 'var(--radius)',
				// md: 'calc(var(--radius) - 2px)',
				// sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['var(--font-family-base)', ...fontFamily.sans],
				heading: ['var(--font-family-heading)']
			}
		}
	},
	corePlugins: { container: false },
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
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
