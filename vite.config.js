import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(), viteTsconfigPaths(), svgrPlugin()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
    }
});
