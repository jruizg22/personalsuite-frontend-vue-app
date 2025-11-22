<script setup lang="ts">
/**
 * TextColumn.vue
 *
 * A simple reusable component for displaying text content in a table column
 * or any container where text truncation is desired.
 *
 * Features:
 * - Supports multi-line truncation with ellipsis.
 * - Configurable number of visible lines.
 *
 * Props:
 * - `value` (string | null): The text content to display.
 * - `lines` (number, optional): Maximum number of visible lines before truncating. Defaults to 3 if not provided.
 *
 * Example usage:
 * ```vue
 * <TextColumn
 *   :value="item.description"
 *   :lines="2"
 * />
 * ```
 *
 * Behavior:
 * - Uses CSS `-webkit-line-clamp` to limit visible lines.
 * - Applies ellipsis (`...`) when content exceeds the allowed lines.
 * - Fully compatible with modern browsers that support `-webkit-line-clamp`.
 *
 * Styling:
 * - Scoped styles ensure truncation is applied locally.
 * - The number of lines can be dynamically adjusted via the `lines` prop.
 * - If `lines` is not specified, the component defaults to 3 lines.
 */

interface Props {
  value: string | null
  lines?: number
}

defineProps<Props>()
</script>

<template>
  <div
      class="truncate-multiline"
      :style="lines ? `--line-count: ${lines}` : undefined"
  >
    {{ value }}
  </div>
</template>

<style scoped>
.truncate-multiline {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: var(--line-count, 3);
}
</style>