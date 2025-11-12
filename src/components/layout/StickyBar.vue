<script setup lang="ts">
/**
 * StickyBar component
 *
 * This component renders a dynamic "sticky" bar that stays fixed
 * immediately below the main toolbar. It is intended for elements
 * like tabs, search fields, filters, or any controls that should
 * remain visible while scrolling the main content.
 *
 * Behavior:
 * - Uses `v-sheet` with `position: sticky` and `top` offset to remain
 *   under the toolbar.
 * - The sticky bar grows in height depending on its content; avoid
 *   fixed heights if multiple rows are needed.
 * - Internal content should be responsive (`v-row`, `v-col`, `w-100`)
 *   to prevent horizontal overflow on small screens.
 *
 * Props & Data:
 * - `layout.stickyComponent` (from Pinia store) determines which component
 *   to render inside the sticky bar dynamically.
 * - `layout.drawerWidth` is used to offset the sticky bar horizontally
 *   to align with the main content when the drawer is open.
 *
 * Example usage inside the main layout:
 * ```vue
 * <StickyBar/>
 * ```
 * The sticky bar will render only if `layout.stickyComponent` is set.
 */

import {useLayoutStore} from '@/stores'

const layout = useLayoutStore()
</script>

<template>
  <v-sheet
      v-if="layout.stickyComponent"
      elevation="1"
      class="sticky-bar"
  >
    <v-container fluid class="pa-0 ma-0">
      <component
          :is="layout.stickyComponent.component || layout.stickyComponent"
          v-bind="layout.stickyComponent.props || {}"
          class="w-100"
      />
    </v-container>
  </v-sheet>
</template>

<style scoped>
/* Sticky bar styling */
.sticky-bar {
  position: sticky; /* Remains visible under the toolbar */
  top: 64px; /* Offset below the main toolbar */
  z-index: 5; /* Above main content but below modals */
  background-color: white;
  width: 100%; /* Full width of the main content area */
}
</style>