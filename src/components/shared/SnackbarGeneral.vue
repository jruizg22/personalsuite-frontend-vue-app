<script setup lang="ts">
/**
 * SnackbarGeneral.vue
 *
 * @component
 * A reusable snackbar component built with Vue 3 + Vuetify.
 *
 * This component is intended to provide consistent, customizable toast-like
 * feedback across the application. It supports flexible placement, styling,
 * and behavior, including multi-line mode and timeouts.
 *
 * ## Props
 *
 * @prop {boolean} modelValue
 * Controls the visibility of the snackbar.
 * When `true`, the snackbar is shown.
 * Updated using `update:modelValue`.
 *
 * @prop {string} label
 * The text message displayed inside the snackbar.
 *
 * @prop {string} [color]
 * Snackbar color (Vuetify color system).
 * Example: `"success"`, `"error"`, `"primary"`.
 *
 * @prop {string} [rounded]
 * Optional rounding style for the snackbar (“sm”, “lg”, “xl”, etc.).
 *
 * @prop {Variant} [variant]
 * Vuetify UI variant for the appearance of the snackbar.
 * Default: `'elevated'`.
 *
 * @prop {SnackbarLocation} [location]
 * Controls where the snackbar is displayed on the screen.
 * Supports values such as `"bottom left"`, `"top"`, `"top right"`, etc.
 * Default: `'bottom left'`.
 *
 * @prop {number} [timeout]
 * Time in milliseconds before the snackbar automatically closes.
 * Default: `5000`.
 *
 * @prop {boolean} [multiLine]
 * Enables multi-line layout for long messages.
 * Default: `false`.
 *
 * ## Emits
 *
 * @event update:modelValue
 * Emitted whenever the snackbar opens or closes.
 * Signature: `(value: boolean) => void`.
 *
 * ## Behavior
 *
 * - The component is a thin wrapper around Vuetify's `<v-snackbar>`.
 * - All props are forwarded directly to `<v-snackbar>`.
 * - Visibility is fully controlled via the `v-model="modelValue"` binding.
 * - No internal state is used; the component is fully controlled.
 *
 * ## Usage Example
 *
 * ```vue
 * <SnackbarGeneral
 *   v-model="showSnackbar"
 *   label="Channel created successfully!"
 *   color="success"
 *   location="top right"
 * />
 * ```
 *
 * This component is ideal for providing consistent feedback messages across
 * the application, especially for CRUD operations and error reporting.
 */

import type {SnackbarLocation} from '@/types'
import type {Variant} from 'vuetify/lib/composables/variant'

interface Props {
  modelValue: boolean
  label: string
  color?: string
  rounded?: string
  variant?: Variant
  location?: SnackbarLocation
  timeout?: number
  multiLine?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'elevated',
  location: 'bottom left',
  timeout: 5000,
  multiLine: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <v-snackbar
      v-model="props.modelValue"
      :color="props.color"
      :variant="props.variant"
      :rounded="props.rounded"
      :location="props.location"
      :timeout="props.timeout"
      :multi-line="props.multiLine"
      @update:modelValue="emit('update:modelValue', $event)"
  >
    {{ props.label }}
  </v-snackbar>
</template>

<style scoped>

</style>