import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import ViteFonts from 'vite-plugin-fonts';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    svgr(),
    ViteFonts({
      google: {
        families: [
          {
            name: 'Inter',
            styles: 'wght@400;800',
          },
        ],
      },
    }),
  ],
});
