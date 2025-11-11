<script setup lang="ts">
/**
 * Dynamic Tabs component.
 *
 * This component renders a set of Vuetify tabs (`v-tabs` / `v-tab`) based on
 * a list of `Tab` objects passed as props. It supports:
 * - Translation of tab labels via `vue-i18n`.
 * - Three tab types: `normal`, `fixed`, and `grow`.
 * - Top or bottom tab positioning.
 * - v-model binding to control the active tab.
 *
 * ### Props
 * @prop {Tab[]} tabs - List of tab objects to render. Each tab must have:
 *   - `tabId: string` – unique identifier for the tab (used for `v-model` and keys)
 *   - `label: string` – i18n key for the tab label
 *   - `icon?: MdiIcon` – optional icon to display before the label
 * @prop {string} [modelValue] - The `tabId` of the active tab (v-model)
 * @prop {'top'|'bottom'} [position='top'] - Tab alignment (top or bottom)
 * @prop {'normal'|'fixed'|'grow'} [type='normal'] - Tab type, controls how tabs are displayed
 *
 * ### Emits
 * @event update:modelValue - Fired when the active tab changes
 *
 * ### Example usage
 * ```vue
 * <Tabs
 *   v-model="activeTab"
 *   :tabs="[
 *     { tabId: 'media', label: 'mediaTracker.media', icon: 'mdi-movie' },
 *     { tabId: 'youtube', label: 'mediaTracker.youtube', icon: 'mdi-youtube' }
 *   ]"
 *   type="fixed"
 *   position="top"
 * />
 * ```
 *
 * ### Notes
 * - `tab.label` should be a key from your i18n messages; the component calls `t(tab.label)`.
 * - The `icon` prop is optional; only tabs with an icon will render a `v-icon` before the label.
 * - The `tabId` is used internally for `v-model` and as a `key` in the loop.
 */

import {ref, watch} from 'vue';
import type {Tab} from '@/types';
import {useI18n} from 'vue-i18n';

const props = defineProps<{
  tabs: Tab[];
  modelValue?: string;
  position?: 'top' | 'bottom';
  type?: 'normal' | 'fixed' | 'grow';
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const activeTab = ref(props.modelValue || (props.tabs[0]?.tabId ?? ''));

watch(activeTab, (val) => {
  emit('update:modelValue', val)
});

watch(() => props.modelValue, (val) => {
  if (val) activeTab.value = val
});

const {t} = useI18n();

</script>

<template>
  <v-tabs
      v-model="activeTab"
      :align-with-title="true"
      :right="position === 'bottom'"
      :fixed-tabs="type === 'fixed'"
      :grow="type === 'grow'"
  >
    <v-tab
        v-for="tab in tabs"
        :key="tab.tabId"
        :value="tab.tabId"
    >
      <v-icon v-if="tab.icon" class="me-2">{{ tab.icon }}</v-icon>
      {{ t(tab.label) }}
    </v-tab>
  </v-tabs>
</template>

<style scoped>

</style>