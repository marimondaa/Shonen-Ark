import nextVitals from 'eslint-config-next/core-web-vitals';
export default [
  ...nextVitals,
  { ignores: ['.next/**', '.next-dev/**', 'node_modules/**', 'shonenark-backend/**', 'test-results/**', 'playwright-report/**'] },
  { rules: {
    'react/no-unescaped-entities': 'warn',
    'react-hooks/set-state-in-effect': 'off',
    'react-hooks/purity': 'off',
    'react-hooks/refs': 'off',
  } },
];
