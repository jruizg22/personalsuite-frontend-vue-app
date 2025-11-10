<script setup lang="ts">
/**
 * Drawer footer component containing the fixed Settings button.
 *
 * Uses `vue-i18n` to provide a localized title for the Settings item.
 *
 * This component is positioned at the bottom of the navigation drawer
 * using `position: absolute` and full width.
 *
 * Visual elements:
 * - Divider (`<v-divider>`) separating the footer from the main content.
 * - Settings list item with an icon (`mdi-cog`) and a route to `/settings`.
 *
 * The background color uses Vuetify's `bg-surface` class to match
 * the current theme.
 */

import {useI18n} from 'vue-i18n'

const {t} = useI18n();
</script>

<template>
  <v-list
      dense
      class="pa-0 drawer-bottom-button bg-surface"
  >
    <v-divider class="ma-0" />
    <v-list-item
        :title="t('common.settings')"
        to="/settings"
        prepend-icon="mdi-cog"
    />
  </v-list>
</template>

<style scoped>
.drawer-bottom-button {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>