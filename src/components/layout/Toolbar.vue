<script setup lang="ts">
/**
 * Top application toolbar component.
 *
 * Uses the `layout` Pinia store to:
 * - Determine whether the current screen is desktop or not (`layout.isDesktop`).
 * - Toggle the navigation drawer on mobile or tablet screens (`layout.toggleDrawer`).
 *
 * Visual elements:
 * - `<v-app-bar>`: Vuetify app bar, colored with the primary theme.
 * - `<v-app-bar-nav-icon>`: hamburger icon, only visible on non-desktop screens.
 * - `<v-toolbar-title>`: displays the application title ("Personal Suite").
 *
 * The toolbar is part of Vuetify's `app` layout system, ensuring
 * correct placement and spacing relative to `v-navigation-drawer` and `v-main`.
 */

import {useLayoutStore} from '@/stores/useLayoutStore.ts'

const layout = useLayoutStore()
</script>

<template>
  <v-app-bar color="primary" app>
    <v-app-bar-nav-icon
        v-if="!layout.isDesktop"
        @click="layout.toggleDrawer"
    />
    <v-toolbar-title>Personal Suite</v-toolbar-title>
  </v-app-bar>
</template>

<style scoped>

</style>