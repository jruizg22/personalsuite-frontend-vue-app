import {createRouter, createWebHistory, type Router} from 'vue-router'
import {HomeView, SettingsView} from '@/components/pages'

/**
 * Vue Router instance for the application.
 *
 * Configured with:
 * - `createWebHistory`: uses HTML5 history mode for clean URLs.
 * - `routes`: defines the main routes of the application.
 *
 * Routes:
 * 1. `/` → `HomeView` (name: 'home')
 * 2. `/settings` → `SettingsView` (name: 'settings')
 *
 * Usage:
 * ```ts
 * import router from '@/router'
 * app.use(router)
 * ```
 */
const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView
        }
    ],
})

export default router