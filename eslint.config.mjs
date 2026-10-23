import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const config = [
  ...nextVitals,
  ...nextTs,
  {
    // Vendored verbatim from React Bits; its animation engine reads refs during render by design.
    files: ['src/components/shell/PillNav/**'],
    rules: {
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts', 'scripts/**'] },
];

export default config;
