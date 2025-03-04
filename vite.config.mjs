import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import { compression } from 'vite-plugin-compression2';
import visualizer from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                PrimeVueResolver()
            ]
        }),
        // Compresión de assets
        compression({
            algorithm: 'gzip', // o 'brotli'
            exclude: [/\.(br)$/, /\.(gz)$/],
        }),
        // Visualizador de bundle (opcional, útil para debugging)
        visualizer({
            filename: './stats.html',
            open: false
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        // Configuraciones de compilación para producción
        minify: 'terser', // Minificación más agresiva
        terserOptions: {
            compress: {
                drop_console: true, // Elimina console.logs en producción
                drop_debugger: true
            }
        },
        sourcemap: false, // Desactiva sourcemaps en producción
        rollupOptions: {
            output: {
                // Divide chunks para mejorar el rendimiento de carga
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        },
        chunkSizeWarningLimit: 1000 // Límite de tamaño de chunks (en KB)
    },
    // Optimizaciones de dev server
    server: {
        port: 3000,
        strictPort: true,
        open: true
    }
});