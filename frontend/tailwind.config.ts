import type { Config } from 'tailwindcss'




const config: Config = {
  
  content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        custom: ["custom-font"],
      },
      colors: {
        // Dark theme colors
        'base-dark': '#242729',
        'primary-dark': '#e4c33e',
        'secondary-dark': '#2a4705',
        'main-text-dark': '#e1ddb3',
        'highlight-text-dark': '#BAD3CE',
        'success-dark': '#16610E',
        'success-text-dark': '#B0DB9C',
        'error-dark': '#8E1616',
        'error-text-dark': '#F7374F',
        'selected-dark': '#c7a704',
        'hover-dark': '#dce66f',

        // Light theme colors
        'base-light': '#fffaec',
        'primary-light': '#F7CF33',
        'secondary-light': '#76c411',
        'main-text-light': '#36443c',
        'highlight-text-light': '#77cbba',
        'success-light': '#1DCD9F',
        'success-text-light': '#169976',
        'error-light': '#F15A59',
        'error-text-light': '#8E1616',
        'selected-light': '#909648',
        'hover-light': '#baaa59',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
  'darkMode': 'class',
}

export default config