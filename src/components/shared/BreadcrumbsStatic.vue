<script setup lang="ts">
/**
 * Breadcrumbs component for the application Toolbar.
 *
 * This component renders the current route's breadcrumb trail using Vuetify's
 * `v-breadcrumbs` and `v-breadcrumbs-item`.
 *
 * Features:
 * - Uses the `useBreadcrumbs` composable to get the current route breadcrumbs.
 * - Dynamically translates breadcrumb labels via `vue-i18n`.
 * - The last breadcrumb (or the only one) is not clickable but keeps the normal text color.
 * - Breadcrumb text size is increased for better visibility (`breadcrumb-large` class).
 *
 * Usage:
 * ```vue
 * <Breadcrumbs />
 * ```
 *
 * Styling:
 * - `.breadcrumb-large` class increases font size and weight.
 * - Inline `style` is applied to non-clickable items to ensure `cursor: default`.
 *
 * Example structure in template:
 * ```vue
 * <v-breadcrumbs>
 *   <v-breadcrumbs-item
 *     v-for="(crumb, index) in breadcrumbs"
 *     :key="index"
 *     :href="breadcrumbs.length > 1 && index !== breadcrumbs.length - 1 ? crumb.path : undefined"
 *     :style="(!crumb.path || breadcrumbs.length === 1) ? { cursor: 'default' } : {}"
 *     class="text-white breadcrumb-large"
 *   >
 *     {{ crumb.name }}
 *   </v-breadcrumbs-item>
 * </v-breadcrumbs>
 * ```
 *
 * Notes:
 * - Ensures consistent white text (`text-white`) to match toolbar color.
 * - Works with dynamic breadcrumbs, including routes with subpaths.
 */

import {useBreadcrumbs} from '@/composables';

const {breadcrumbs} = useBreadcrumbs();
</script>

<template>
  <template v-for="(crumb, index) in breadcrumbs" :key="index">
    <span>{{ crumb.name }}</span>
    <span v-if="index < breadcrumbs.length - 1"> / </span>
  </template>
</template>

<style scoped>

</style>