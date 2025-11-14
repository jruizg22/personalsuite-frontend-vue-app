import {defineStore} from 'pinia'
import {type Component, markRaw, type Ref} from 'vue'
import {ref, watch} from 'vue'
import {useLayoutStore} from '@/stores'
import {StickyBarContent} from '@/components/layout'

/**
 * `BarElement` — Sticky Bar Element
 *
 * Represents a single component rendered inside the sticky bar.
 * Each element has a unique identifier, the Vue component to render,
 * and optionally the props to pass to that component.
 *
 * ### Properties
 * @property {string} id
 *   A unique identifier automatically generated. Used for adding, removing,
 *   and rendering elements efficiently in the sticky bar.
 *
 * @property {Component} component
 *   The Vue component that will be rendered inside the sticky bar.
 *   It is recommended to wrap the component with `markRaw` when adding it
 *   to the store to prevent Vue warnings about unnecessary reactivity.
 *
 * @property {Record<string, any>} [props]
 *   Optional props to pass to the component when rendering it.
 *
 * ### Example
 * ```ts
 * import SearchField from '@/components/shared/filtering/SearchField.vue'
 *
 * const element: BarElement = {
 *   id: '12345',
 *   component: markRaw(SearchField),
 *   props: { modelValue: searchValue }
 * }
 * ```
 */
interface BarElement {
    /** Unique identifier for the element. */
    id: string
    /** Vue component to render in the sticky bar. */
    component: Component
    /** Optional props to pass to the component when rendered. */
    props?: Record<string, any>
}

/**
 * `useStickyBarStore` Pinia Store
 *
 * Manages a dynamic "sticky bar" under the main toolbar. This bar can contain
 * any number of Vue components such as search fields, filters, or tabs. Components
 * can be added, removed, or cleared dynamically.
 *
 * ### State
 * @state
 * - `elements: Ref<BarElement[]>` — List of components currently in the sticky bar.
 *   Each element includes:
 *   - `id`: unique string identifier
 *   - `component`: the Vue component to render (wrapped in `markRaw` to prevent Vue warnings)
 *   - `props`: optional props to pass to the component
 *
 * ### Actions
 * @action
 * - `add(component: Component, props?: Record<string, any>, top?: boolean): string`
 *     - Adds a component to the sticky bar.
 *     - `component`: Vue component to render
 *     - `props`: optional props for the component
 *     - `top`: optional, default `false`. If `true`, adds at the start; otherwise at the end
 *     - Returns the generated `id` for the element.
 *
 * - `remove(id: string): void`
 *     - Removes a component from the sticky bar by its `id`.
 *
 * - `clear(): void`
 *     - Removes all components from the sticky bar.
 *
 * ### Behavior
 * - The store watches `elements` and automatically updates the sticky bar:
 *   - If `elements` is empty, calls `layout.clearStickyComponent()` to hide the bar.
 *   - Otherwise, calls `layout.setStickyComponent(StickyBarContent, { items: elements })` to render components.
 * - Components are wrapped with `markRaw` to prevent Vue from making them reactive, avoiding performance warnings.
 * - The `top` parameter in `add()` can be used to control element order.
 *
 * ### Example Usage
 * ```ts
 * import { useStickyBarStore } from '@/stores'
 * import SearchField from '@/components/shared/filtering/SearchField.vue'
 * import { ref } from 'vue'
 *
 * const sticky = useStickyBarStore()
 * const search = ref('')
 *
 * // Add a search field at the top
 * const id = sticky.add(SearchField, { modelValue: search }, true)
 *
 * // Remove a specific element
 * sticky.remove(id)
 *
 * // Clear all elements
 * sticky.clear()
 * ```
 *
 * ### Notes
 * - Use `markRaw` to avoid Vue warnings when storing components in reactive state.
 * - Every element must have a unique `id` for proper rendering and removal.
 * - Elements are rendered in the order they appear in `elements`, respecting the `top` flag.
 */
export const useStickyBarStore = defineStore('stickyBar', () => {
    const layout = useLayoutStore()

    // Element list (searchfields, filters, etc)
    const elements: Ref<BarElement[]> = ref<BarElement[]>([])

    function add(component: Component, props?: Record<string, any>, top: boolean = false): string {
        const id: string = `${Date.now()}-${Math.random()}`
        const element = { id, component: markRaw(component), props }

        if (top) {
            elements.value.unshift(element) // add to start
        } else {
            elements.value.push(element)    // add to end
        }

        return id
    }

    function remove(id: string): void {
        elements.value = elements.value.filter(e => e.id !== id)
    }

    function clear(): void {
        elements.value = []
    }

    // When anything changes → rebuild stickyComponent
    watch(elements, (): void => {
        if (elements.value.length === 0) {
            layout.clearStickyComponent()
        } else {
            layout.setStickyComponent(StickyBarContent, {
                items: elements.value
            })
        }
    }, { deep: true })

    return {
        elements,
        add,
        remove,
        clear
    }
})