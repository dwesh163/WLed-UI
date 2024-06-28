/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class', // or 'media' if you prefer
	theme: {
		extend: {
			colors: {
				background: 'var(--color-background)',
				foreground: 'var(--color-foreground)',
				primary: 'var(--color-primary)',
				'primary-foreground': 'var(--color-primary-foreground)',
				'muted-foreground': 'var(--color-muted-foreground)',
			},
		},
	},
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	plugins: [],
};
