import { defineConfig } from 'vite';
import laravel, { refreshPaths } from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'


export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: [
                // 'resources/css/app.css',
                'resources/css/vue_app.css',
                // 'resources/css/bla.css',

                // 'resources/js/app.js',
                'resources/js/vue_app.js',
            ],
            refresh: [
                // ...refreshPaths,
                // 'app/Http/Livewire/**',
            ],
        }),
    ],
});
