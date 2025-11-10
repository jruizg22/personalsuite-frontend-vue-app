<script setup lang="ts">
/**
 * Main layout wrapper component for the application content.
 *
 * This component renders:
 * - `Toolbar`: the top app bar.
 * - `Drawer`: the navigation drawer.
 * - `v-main` containing the routed page content inside a fluid container.
 *
 * The `<router-view>` is used to display the matched route component.
 */

import {Toolbar, Drawer} from '@/components/layout'
</script>

<template>
  <!-- Toolbar at the top -->
  <Toolbar />

  <!-- Navigation drawer on the side -->
  <Drawer />

  <!-- Main content area -->
  <v-main>
    <v-container fluid class="pa-0 ma-0">
      <router-view/>
    </v-container>
  </v-main>
</template>

<style scoped>

</style>