<script setup lang="ts">
/**
 * Drawer content component containing the main list of navigation items.
 *
 * Uses `vue-i18n` to provide localized titles for the list items.
 *
 * Currently renders:
 * - A single navigation item: "Start" (`common.start`) with a home icon.
 *
 * This list is scrollable and takes all available vertical space in the drawer.
 */

import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <v-list dense class="pa-0" style="flex: 1 1 auto; overflow-y: auto;">
    <!-- Navigation item using i18n for the title -->
    <v-list-item
        :title="t('common.start')"
        to="/"
        prepend-icon="mdi-home"
    />
  </v-list>
</template>

<style scoped>

</style>