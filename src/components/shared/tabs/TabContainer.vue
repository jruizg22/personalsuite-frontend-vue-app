<script setup lang="ts">
/**
 * `TabContainer` component
 *
 * A reusable tabs container based on Vuetify (`v-tabs` and `v-tabs-window-item`).
 * This component allows dynamic tabs creation and displays their content via named slots.
 *
 * ### Features:
 * - Dynamically renders tabs from a `tabs` array.
 * - Supports `v-model` for the active tab.
 * - Uses i18n for tab labels.
 * - Content for each tab is rendered via named slots matching `tabId`.
 *
 * @props
 * @prop {Tab[]} tabs - Array of tabs to display. Each `Tab` should have at least:
 *   - `tabId: string`
 *   - `label: string`
 *   - Optional: `icon: string`
 * @prop {string} [modelValue] - The active tab's `tabId`. Defaults to the first tab if not provided.
 * @prop {'top' | 'bottom'} [position='top'] - Position of the tabs within the container.
 * @prop {'normal' | 'fixed' | 'grow'} [type='normal'] - Type of tabs:
 *   - `'normal'`: default Vuetify behavior
 *   - `'fixed'`: fixed width for each tab
 *   - `'grow'`: tabs expand to fill container width
 *
 * @emits
 * @emit {string} update:modelValue - Emitted when the active tab changes.
 *
 * @slots
 * @slot {tabId} - Named slots to render the content of each tab. The slot name must match `item.tabId`.
 *
 * @example
 * ```vue
 * <TabContainer v-model="currentTab" :tabs="tabs" type="grow">
 *   <template #channels>
 *     <p>Channels content goes here</p>
 *   </template>
 *
 *   <template #videos>
 *     <p>Videos content goes here</p>
 *   </template>
 * </TabContainer>
 * ```
 *
 * @remarks
 * - The active tab is synchronized with `v-model`.
 * - Make sure the named slots match exactly the `tabId` values.
 */

import {type Ref, ref, watch} from 'vue'
import type {Tab} from '@/types'
import {useI18n} from 'vue-i18n'

const props = defineProps<{
  tabs: Tab[]
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const activeTab: Ref<string> = ref(props.modelValue || props.tabs[0]?.tabId || '')
watch(activeTab, val => emit('update:modelValue', val))
watch(() => props.modelValue, val => { if (val) activeTab.value = val })

const {t} = useI18n()
</script>

<template>
  <v-tabs
      v-model="activeTab"
      :items="tabs"
      grow
      class="w-100"
      color="primary"
  >
    <!-- Render each tab -->
    <v-tab
        v-for="tab in tabs"
        :key="tab.tabId"
        :value="tab.tabId"
    >
      <v-icon v-if="tab.icon" :icon="tab.icon" start />
      {{ t(tab.label) }}
    </v-tab>
  </v-tabs>

</template>

<style scoped>

</style>