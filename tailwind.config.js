// tailwind.config.js in project root
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',                 // root app and direct src files
    './src/Citi_Bank_UI/src/**/*.{js,jsx,ts,tsx}', // subapp Citi_Bank_UI
    './src/Wealth_Advisory/src/**/*.{js,jsx,ts,tsx}', // subapp Wealth_Advisory (if needed)
  ],
  theme: {
    extend: {
      colors: {
        'navbar-bg-dark': '#2d325c',
        'page-bg-light': 'white',
        'page-bg-dark': '#1D2041',
      },
    },
  },
  plugins: [],
};
