<script setup lang="ts">
/**
 * Navigation drawer component for the application.
 *
 * This component uses the `layout` store to control:
 * - `layout.drawer`: whether the drawer is open.
 * - `layout.isDesktop`: to determine if the drawer is permanent or temporary.
 *
 * It renders two subcomponents:
 * - `DrawerContent`: the main scrollable content of the drawer.
 * - `DrawerFooter`: a fixed footer (e.g., Settings button) at the bottom of the drawer.
 *
 * The drawer is wrapped in Vuetify's `<v-navigation-drawer>` with responsive behavior.
 */

import {useLayoutStore} from '@/stores/useLayoutStore.ts'
import {DrawerContent, DrawerFooter} from '@/components/layout'

const layout = useLayoutStore()
</script>

<template>
  <v-navigation-drawer
      v-model="layout.drawer"
      :permanent="layout.isDesktop"
      :temporary="!layout.isDesktop"
      app
      class="pt-0 d-flex flex-column"
  >
    <DrawerContent/>
    <DrawerFooter/>
  </v-navigation-drawer>
</template>

<style scoped>

</style>