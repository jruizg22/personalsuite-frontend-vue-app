import {defineStore} from 'pinia'
import {type Component, type Ref, ref, shallowRef, watch} from 'vue'
import {useIsDesktop} from '@/composables'

/**
 * Pinia store for managing the application's layout state.
 *
 * This store controls:
 * - The navigation drawer open/close state.
 * - Responsive layout detection (desktop vs mobile).
 * - A dynamic "sticky component" that can be rendered under the main toolbar
 *   (e.g., tabs, search fields, filters).
 *
 * @state
 * - `drawer: Ref<boolean>` — whether the navigation drawer is open.
 * - `isDesktop: Ref<boolean>` — `true` if the viewport is large (desktop).
 * - `stickyComponent: Ref<any | null>` — the component to render under the toolbar.
 *
 * @actions
 * - `toggleDrawer(): void` — toggles the navigation drawer open/closed.
 * - `setStickyComponent(component: any): void` — sets a dynamic component to be displayed under the toolbar.
 * - `clearStickyComponent(): void` — clears the sticky component.
 *
 * @behavior
 * - Automatically opens the drawer when entering desktop view and closes it on smaller screens.
 * - Sticky component is rendered dynamically and can include any Vue component.
 *
 * @example
 * ```ts
 * import { useLayoutStore } from '@/stores/layout'
 *
 * const layout = useLayoutStore()
 *
 * // Toggle drawer
 * layout.toggleDrawer()
 *
 * // Set a sticky component (e.g., tabs or search bar)
 * layout.setStickyComponent(MyTabsComponent)
 *
 * // Clear the sticky component
 * layout.clearStickyComponent()
 *
 * // Reactive state
 * console.log(layout.drawer.value)      // true/false
 * console.log(layout.isDesktop.value)  // true if viewport is desktop
 * console.log(layout.stickyComponent.value) // Current sticky component or null
 * ```
 */
export const useLayoutStore = defineStore('layout', () => {
    /** Whether the navigation drawer is open */
    const drawer: Ref<boolean> = ref(false)

    /** True if the viewport is desktop (lg breakpoint or larger) */
    const isDesktop: Ref<boolean> = useIsDesktop()

    /** Automatically open/close drawer when screen size changes */
    watch(isDesktop, (val: boolean): void => {
        drawer.value = val
    }, { immediate: true })

    /** Toggle the drawer open/closed */
    const toggleDrawer = (): void => {
        drawer.value = !drawer.value
    }

    /** Dynamic component rendered under the toolbar (sticky bar) */
    const stickyComponent: Component = shallowRef<null | { component: Component, props?: Record<string, any> }>(null)

    /** Set a component as the sticky bar */
    const setStickyComponent = (component: Component, props?: Record<string, any>): void => {
        stickyComponent.value = { component, props }
    }

    /** Clear the sticky bar component */
    const clearStickyComponent = (): void => {
        stickyComponent.value = null
    }

    return {
        drawer,
        isDesktop,
        toggleDrawer,
        stickyComponent,
        setStickyComponent,
        clearStickyComponent
    }
})