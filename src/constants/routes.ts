import type {RouteRecordRaw} from 'vue-router'
import {HomeView, SettingsView} from '@/components/pages'

/**
 * Base application routes configuration.
 *
 * This array defines the core routes available in the app, following
 * the `vue-router` {@link RouteRecordRaw} type for type safety.
 *
 * Each route specifies:
 * - `path`: The URL path for the route.
 * - `name`: A unique name identifier for programmatic navigation.
 * - `component`: The Vue component to render for the route.
 * - `meta.breadcrumb`: An i18n key used by the `useBreadcrumbs` composable
 *   to generate translated breadcrumb labels.
 *
 * Example:
 * ```ts
 * import { routes } from '@/constants'
 * import { createRouter, createWebHistory } from 'vue-router'
 *
 * const router = createRouter({
 *   history: createWebHistory(),
 *   routes,
 * })
 * ```
 *
 * @see {@link https://router.vuejs.org/guide/} for Vue Router documentation.
 */
export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { breadcrumb: 'common.start' },
    },
    {
        path: '/settings',
        name: 'settings',
        component: SettingsView,
        meta: { breadcrumb: 'common.settings' },
    },
] as const;