import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  content: [join(__dirname, 'src/**/*.{ts,tsx}')],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
