import {defineStore} from 'pinia'
import {ref, watch} from 'vue'
import {useIsDesktop} from '@/composables'

/**
 * Pinia store for managing the application's layout state.
 *
 * This store controls the navigation drawer and responsive behavior.
 *
 * State:
 * - `drawer` (Ref<boolean>): whether the navigation drawer is open.
 * - `isDesktop` (Ref<boolean>): whether the viewport is large (`lg`) or larger.
 *
 * Actions:
 * - `toggleDrawer()`: toggles the drawer open/closed state.
 *
 * Behavior:
 * - Automatically opens/closes the drawer based on `isDesktop` using a watcher.
 *
 * @example
 * ```ts
 * import { useLayoutStore } from '@/stores/layout'
 *
 * const layout = useLayoutStore()
 * layout.toggleDrawer() // toggles the drawer
 * console.log(layout.isDesktop.value) // true if viewport is lg or bigger
 * ```
 */
export const useLayoutStore = defineStore('layout', () => {
    const drawer = ref(false)
    const isDesktop = useIsDesktop()

    watch(isDesktop, (val: boolean): void => {
        drawer.value = val
    }, { immediate: true })

    const toggleDrawer = (): void => {
        drawer.value = !drawer.value
    }

    return { drawer, isDesktop, toggleDrawer }
})