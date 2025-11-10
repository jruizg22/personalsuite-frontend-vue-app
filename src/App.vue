<script setup lang="ts">
/**
 * Root component of the application.
 *
 * This component wraps the main layout (`MainLayout`) inside
 * Vuetify's `<v-app>` container.
 *
 * Usage:
 * ```vue
 * <AppRoot />
 * ```
 *
 * Components:
 * - `MainLayout`: handles the app's toolbar, navigation drawer, and main content slot.
 */

import {MainLayout} from '@/components/layout'

</script>

<template>
  <!-- Vuetify app container -->
  <v-app>
    <!-- Main layout with toolbar, drawer, and content slot -->
    <MainLayout/>
  </v-app>
</template>

<style scoped>

</style>
