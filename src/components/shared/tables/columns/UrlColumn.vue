<script setup lang="ts">
/**
 * UrlColumn.vue
 *
 * A reusable component for displaying URLs as clickable links in a table column
 * or any container. Supports multi-line truncation and optional custom labels.
 *
 * Features:
 * - Displays a URL as a clickable `<a>` element.
 * - Opens the link in a new tab (`target="_blank"`) with safe attributes (`rel="noopener noreferrer"`).
 * - Supports multi-line truncation with CSS `-webkit-line-clamp`.
 * - Optional `label` to display text different from the URL.
 *
 * Props:
 * - `url` (string | null): The URL to link to. If null, the anchor will be non-functional.
 * - `label` (string, optional): Custom text to display instead of the URL. Defaults to showing the URL itself.
 * - `lines` (number, optional): Maximum number of visible lines before truncating. Defaults to 1.
 *
 * Example usage:
 * ```vue
 * <UrlColumn
 *   :url="item.url"
 *   label="Visit website"
 *   :lines="2"
 * />
 * ```
 *
 * Behavior:
 * - Uses CSS `-webkit-line-clamp` to truncate overflowing text.
 * - Dynamically sets the number of lines using the `lines` prop via a CSS variable.
 * - If `lines` is not provided, it defaults to 1 line.
 * - Ensures safe external links with `rel="noopener noreferrer"`.
 *
 * Styling:
 * - Scoped styles prevent truncation from affecting other elements.
 * - Fully compatible with modern browsers that support `-webkit-line-clamp`.
 */

interface Props {
  url: string | null
  label?: string
  lines?: number
}

defineProps<Props>()
</script>

<template>
  <a
      :href="url || undefined"
      target="_blank"
      rel="noopener noreferrer"
      class="truncate-multiline"
      :style="lines ? `--line-count: ${lines}` : undefined"
  >
    {{ label ?? url }}
  </a>
</template>

<style scoped>
.truncate-multiline {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: var(--line-count, 1);
}
</style>