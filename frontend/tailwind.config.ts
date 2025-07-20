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
      colors: {
        // Dark theme colors
        'base-dark': '#031525',
        'primary-dark': '#0794B0',
        'secondary-dark': '#20CCC7',
        'main-text-dark': '#DAEBE7',
        'highlight-text-dark': '#E1F0F7',
        'success-dark': '#16610E',
        'success-text-dark': '#B0DB9C',
        'error-dark': '#8E1616',
        'error-text-dark': '#F7374F',
        'selected-dark': '#9ECAD6',
        'hover-dark': '#113F67',

        // Light theme colors
        'base-light': '#EAF1F0',
        'primary-light': '#63C9DD',
        'secondary-light': '#AAE4E2',
        'main-text-light': '#04364C',
        'highlight-text-light': '#DAEBE7',
        'success-light': '#1DCD9F',
        'success-text-light': '#169976',
        'error-light': '#F15A59',
        'error-text-light': '#8E1616',
        'selected-light': '#3D74B6',
        'hover-light': '#63C8FF',
      },
    },
  },
  plugins: [],
  'darkMode': 'class',
}

export default config