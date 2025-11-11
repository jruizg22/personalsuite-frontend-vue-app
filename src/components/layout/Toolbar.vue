<script setup lang="ts">
/**
 * Top application toolbar component.
 *
 * This component renders the main application toolbar using Vuetify's `v-app-bar`.
 * It integrates the navigation drawer toggle and dynamic breadcrumbs.
 *
 * Features:
 * - Uses the `layout` Pinia store to:
 *   - Determine whether the current screen is desktop (`layout.isDesktop`).
 *   - Toggle the navigation drawer on mobile or tablet screens (`layout.toggleDrawer`).
 * - Displays breadcrumbs via the `Breadcrumbs` component, which automatically
 *   translates route names using `vue-i18n` and handles clickability.
 *
 * Visual elements:
 * - `<v-app-bar>`: Vuetify app bar, colored with the primary theme.
 * - `<v-app-bar-nav-icon>`: hamburger icon, only visible on non-desktop screens.
 * - `<Breadcrumbs>`: displays the current route breadcrumb trail, with
 *   the last item non-clickable and styled appropriately.
 *
 * Layout integration:
 * - The toolbar is part of Vuetify's `app` layout system, ensuring correct
 *   placement and spacing relative to `v-navigation-drawer` and `v-main`.
 *
 * Usage:
 * ```vue
 * <Toolbar />
 * ```
 *
 * Notes:
 * - The `app` prop ensures the toolbar occupies the correct space in the layout.
 * - The component automatically adapts to desktop and mobile screen sizes.
 */

import {useLayoutStore} from '@/stores';
import {BreadcrumbsStatic} from '@/components/shared';

const layout = useLayoutStore();
</script>

<template>
  <v-app-bar color="primary" app>
    <v-app-bar-nav-icon
        v-if="!layout.isDesktop"
        @click="layout.toggleDrawer"
    />
    <v-toolbar-title>
      <BreadcrumbsStatic/>
    </v-toolbar-title>
  </v-app-bar>
</template>

<style scoped>

</style>