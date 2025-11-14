<script setup lang="ts">
/**
 * `StickyBarContent` component
 *
 * This component renders a list of dynamic elements inside a Vuetify container,
 * typically used inside a "sticky bar" (under a toolbar). Each element is passed
 * as a Vue component with optional props and is rendered inside a `v-row` / `v-col`
 * to make them stack vertically and stretch horizontally.
 *
 * ### Props
 * @prop {Array<{id: string, component: any, props?: Record<string, any>}>} items
 *   - `id`: Unique identifier for the element, used as the `key` in `v-for`.
 *   - `component`: The Vue component to render.
 *   - `props` (optional): An object of props to pass to the component.
 *
 * ### Behavior
 * - Each item is wrapped in `<v-row no-gutters>` and `<v-col>` to
 *   ensure proper stacking and horizontal stretching.
 * - Designed to work with the `useStickyBarStore` and `useLayoutStore`, which
 *   manage the list of elements dynamically.
 * - Items can be mounted and unmounted dynamically by adding/removing them
 *   from the sticky bar store.
 *
 * ### Example usage
 * ```ts
 * // In the sticky bar store:
 * sticky.add(MySearchFieldComponent, { modelValue: searchQuery })
 * sticky.add(MyFiltersComponent)
 *
 * // StickyBarContent will render all components in vertical order:
 * <StickyBarContent :items="stickyElements" />
 * ```
 *
 * ### Notes
 * - Do not add layout classes like `d-flex` or `justify-end` to the container itself,
 *   as the component already uses `v-row` / `v-col` to manage spacing.
 * - Each component in `items` should ideally be wrapped in a reactive object using
 *   `markRaw` if necessary, to prevent Vue warnings about making components reactive.
 * - Use `w-100` on the column to ensure that the components stretch across the full width.
 */

defineProps<{
  items: Array<{
    id: string
    component: any
    props?: Record<string, any>
  }>
}>()
</script>

<template>
  <v-container class="ma-0 pa-0">
    <v-row
        v-for="el in items"
        :key="el.id"
        no-gutters
    >
      <v-col>
        <component
            :is="el.component"
            v-bind="el.props"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>