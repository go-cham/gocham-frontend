module.exports = {
  singleQuote: true,
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^./(.*)$', '^../(.*)$'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    require('@trivago/prettier-plugin-sort-imports'),
    require('prettier-plugin-tailwindcss'),
  ],
};
