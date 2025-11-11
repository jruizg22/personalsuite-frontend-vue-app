import {createRouter, createWebHistory, type Router, type RouteRecordRaw} from 'vue-router'
import {routes as baseRoutes} from '@/constants'

/**
 * Main Vue Router instance for the application.
 *
 * This file initializes and exports the application's router, which is
 * configured to use HTML5 history mode via `createWebHistory`.
 *
 * The router merges the base routes defined in `@/constants` with any
 * additional module-specific routes (if added in the future) to create
 * a unified navigation structure.
 *
 * ### Features:
 * - Uses the `import.meta.env.BASE_URL` as the base public path.
 * - Provides a single source of truth for all app navigation.
 * - Designed to support modular route extensions (e.g. `/modules/.../routes.ts`).
 *
 * ### Example:
 * ```ts
 * import router from '@/router'
 * import { createApp } from 'vue'
 * import App from '@/App.vue'
 *
 * const app = createApp(App)
 * app.use(router)
 * app.mount('#app')
 * ```
 *
 * @see {@link https://router.vuejs.org/guide/} Vue Router official guide
 * @see {@link RouteRecordRaw} for the route record type definition
 */

const routes: RouteRecordRaw[] = [
    ...baseRoutes
]

/**
 * The main application router.
 * Handles navigation, history management, and route resolution.
 */
const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router