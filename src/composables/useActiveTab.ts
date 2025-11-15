import {ref, type Ref} from 'vue'

const activeTab: Ref<string> = ref('') // Empty initial value

/**
 * `useActiveTab` — Global Active Tab Composable
 *
 * This composable provides a shared reactive reference for tracking
 * the currently active tab across different parts of the application.
 *
 * It behaves like a lightweight global store (without Pinia) and is
 * useful for coordinating tab changes between components such as:
 * - the TabContainer
 * - individual tab views
 * - sticky bar components
 *
 * ### State
 * @state
 * - `activeTab: Ref<string>`
 *     A shared reactive reference containing the ID of the currently
 *     active tab. Its initial value is an empty string.
 *
 * ### Methods
 * @method
 * - `setActiveTab(tabId: string): void`
 *     Updates the value of `activeTab`. Any component using the
 *     composable will react to this change.
 *
 * ### Behavior
 * - All components that call `useActiveTab()` share the same state.
 * - The value persists only while the app is running; it resets when
 *   the page is reloaded.
 * - The composable is **not** tied to any specific view or route,
 *   but its value does *not* persist across route changes unless
 *   manually reset by the developer.
 *
 * ### Example Usage
 * ```ts
 * import { useActiveTab } from '@/composables'
 *
 * const { activeTab, setActiveTab } = useActiveTab()
 *
 * // Set the active tab
 * setActiveTab('channels')
 *
 * // React to tab changes
 * watch(activeTab, newTab => {
 *   console.log('Active tab is now:', newTab)
 * })
 * ```
 *
 * ### Notes
 * - Use this composable when you need to synchronize the selected tab
 *   between UI components that do not directly communicate.
 * - If you need route-level persistence, consider using Pinia instead.
 */
export function useActiveTab() {
    return {
        activeTab,
        setActiveTab: (tabId: string): void => { activeTab.value = tabId }
    }
}