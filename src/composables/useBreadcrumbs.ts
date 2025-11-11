import {useRoute} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {computed} from 'vue'

/**
 * Composable for generating translated breadcrumbs based on the current route.
 *
 * This composable reads the `meta.breadcrumb` property of each matched route
 * in `route.matched` and returns a reactive list of breadcrumb objects with:
 * - `name`: the translated breadcrumb label (via `vue-i18n`).
 * - `path`: the route path, used for navigation.
 *
 * Usage:
 * ```ts
 * import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
 *
 * const { breadcrumbs } = useBreadcrumbs()
 * ```
 *
 * Example usage in a template:
 * ```vue
 * <v-breadcrumbs>
 *   <v-breadcrumbs-item
 *     v-for="(crumb, index) in breadcrumbs"
 *     :key="index"
 *     :href="index < breadcrumbs.length - 1 ? crumb.path : undefined"
 *     class="text-white breadcrumb-large"
 *   >
 *     {{ crumb.name }}
 *   </v-breadcrumbs-item>
 * </v-breadcrumbs>
 * ```
 *
 * @returns An object containing:
 * - `breadcrumbs`: a computed array of `{ name: string, path: string }`
 *   representing the current route's breadcrumb trail.
 */
export function useBreadcrumbs() {
    const route = useRoute()
    const {t} = useI18n()

    const breadcrumbs = computed(() => {
        return route.matched
            .filter(r => r.meta && r.meta.i18nKey)
            .map(r => ({
                name: t(r.meta.i18nKey as string),
                path: r.path
            }))
    });

    return {breadcrumbs}
}