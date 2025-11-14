import {useDisplay} from 'vuetify'
import type {Ref} from 'vue'

/**
 * Composable to detect if the current screen size is desktop (large or larger).
 *
 * Uses Vuetify's `useDisplay()` composable to access responsive breakpoints.
 *
 * @returns A boolean indicating whether the viewport is large (`lg`) or bigger.
 *
 * @example
 * ```ts
 * import { useIsDesktop } from '@/composables/useIsDesktop'
 *
 * const isDesktop = useIsDesktop()
 * if (isDesktop.value) {
 *   console.log('Desktop layout')
 * }
 * ```
 */
export function useIsDesktop(): Ref<boolean> {
    const {lgAndUp} = useDisplay()
    return lgAndUp
}