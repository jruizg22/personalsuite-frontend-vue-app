<script setup lang="ts">
/**
 * `TabContent` — Dynamic Tab Content Component
 *
 * This component renders the content of a set of tabs using `v-tabs-window` and
 * `v-tabs-window-item` from Vuetify. Each tab's content is dynamically rendered
 * via the `component` property of the `Tab` object.
 *
 * ### Props
 * @prop {Tab[]} tabs
 *   An array of `Tab` objects. Each `Tab` must have a unique `tabId` and a
 *   `component` to render for that tab.
 *
 * @prop {string} activeTab
 *   The currently active tab's `tabId`. The component watches this prop and
 *   synchronizes it with internal state (`localTab`) to control which tab
 *   content is visible.
 *
 * ### Behavior
 * - The component uses a local reactive `Ref` (`localTab`) to manage the currently
 *   visible tab content.
 * - When `activeTab` changes externally, `localTab` updates accordingly.
 * - Each tab's content is rendered as a dynamic component (`<component :is="..."/>`)
 *   inside a `v-tabs-window-item`.
 *
 * ### Example Usage
 * ```vue
 * <TabContent :tabs="tabs" :activeTab="currentTab" />
 * ```
 *
 * Where `tabs` is an array of `Tab` objects, e.g.:
 * ```ts
 * const tabs: Tab[] = [
 *   { tabId: 'channels', label: 'Channels', component: ChannelsTab },
 *   { tabId: 'videos', label: 'Videos', component: VideosTab }
 * ]
 * ```
 *
 * ### Notes
 * - Only the content of the active tab is displayed at any time.
 * - This component is compatible with the `useStickyBarStore` or other dynamic
 *   tab implementations where content components are added and removed dynamically.
 */

import type {Tab} from '@/types'
import {ref, type Ref, watch} from 'vue'

const props = defineProps<{
  tabs: Tab[]
  activeTab: string
}>()

const localTab: Ref<string> = ref(props.activeTab)

watch(() => props.activeTab, (val) => {
  if (val !== localTab.value) localTab.value = val
})
</script>

<template>
  <v-tabs-window v-model="localTab">
    <v-tabs-window-item
        v-for="tab in tabs"
        :key="tab.tabId"
        :value="tab.tabId"
    >
      <component :is="tab.component" />
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<style scoped>

</style>