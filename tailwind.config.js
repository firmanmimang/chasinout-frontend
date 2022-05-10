module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: 'true',
        padding: '1rem',
      },
      colors: {
        // cyan: colors.cyan,
        // teal: colors.teal,
        // 'light-blue': colors.lightBlue,
      },
      spacing: {
        112: '28rem',
      },
    },
  },
  plugins: [],
}
