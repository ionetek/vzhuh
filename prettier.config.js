module.exports = {
  proseWrap: 'always',
  singleQuote: true,
  jsxSingleQuote: true,
  semi: true,
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
  printWidth: 120,
};
