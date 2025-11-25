<script setup lang="ts">
/**
 * ConfirmDialog.vue
 *
 * @component
 * A reusable confirmation dialog component for Vue 3 + Vuetify.
 *
 * This dialog is typically used before executing irreversible actions such as
 * deletions, submissions, or updates. It provides customizable text, button
 * properties, and emits events for precise control of user actions.
 *
 * ## Props
 *
 * @prop {boolean} modelValue
 * Controls the visibility of the dialog.
 * When `true`, the dialog is displayed.
 * Emitted back via `update:modelValue`.
 *
 * @prop {string} [title]
 * Optional dialog title.
 * Defaults to the localized value of `commonKeys.confirm`.
 *
 * @prop {string} [message]
 * Optional message shown in the dialog body.
 *
 * @prop {ButtonProps} [confirmButton]
 * Customization object for the confirm button.
 * Default: `{ text: t(commonKeys.yes), color: 'primary', variant: 'flat' }`.
 *
 * @prop {ButtonProps} [cancelButton]
 * Customization object for the cancel button.
 * Default: `{ text: t(commonKeys.no), variant: 'text' }`.
 *
 * ## Emits
 *
 * @event update:modelValue
 * Emitted when the dialog is opened or closed.
 * Signature: `(value: boolean) => void`.
 *
 * @event confirm
 * Emitted when the user clicks the confirm button.
 *
 * @event cancel
 * Emitted when the user clicks the cancel button.
 *
 * ## Behavior
 *
 * - The component merges provided button props with internal defaults.
 * - Closing the dialog always emits `update:modelValue = false`.
 * - `confirm()` closes the dialog and emits `confirm`.
 * - `cancel()` closes the dialog and emits `cancel`.
 *
 * ## Usage Example
 *
 * ```vue
 * <ConfirmDialog
 *   v-model="showConfirm"
 *   title="Delete Channel"
 *   :message="`Are you sure you want to delete ${channel.name}?`"
 *   @confirm="deleteChannel"
 * />
 * ```
 *
 * This component is fully suitable for global reuse throughout the app,
 * especially when combined with store actions or CRUD workflows.
 */

import {useI18n} from 'vue-i18n'
import {commonKeys} from '@/i18n'
import type {ButtonProps} from '@/types'
import {computed} from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  message?: string
  confirmButton?: ButtonProps
  cancelButton?: ButtonProps
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const { t } = useI18n()

const defaultConfirm: ButtonProps = {
  text: t(commonKeys.yes),
  color: 'primary',
  variant: 'flat'
}

const defaultCancel: ButtonProps = {
  text: t(commonKeys.no),
  variant: 'text'
}

/* Merge defaults with props */
const confirmBtn = computed<ButtonProps>(() => ({
  ...defaultConfirm,
  ...props.confirmButton
}))

const cancelBtn = computed<ButtonProps>(() => ({
  ...defaultCancel,
  ...props.cancelButton
}))

function onCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}

function onConfirm() {
  emit('confirm')
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog v-model="props.modelValue" width="auto" transition="dialog-bottom-transition" persistent>
    <v-card :title="props.title || t(commonKeys.confirm)">

      <v-divider/>

      <v-card-text v-if="props.message">
        {{ props.message }}
      </v-card-text>

      <v-card-actions>
        <!-- Cancel button -->
        <v-btn
            :color="cancelBtn.color"
            :variant="cancelBtn.variant"
            :ripple="cancelBtn.ripple"
            @click="onCancel"
        >
          {{ cancelBtn.text }}
        </v-btn>

        <!-- Confirm button -->
        <v-btn
            :color="confirmBtn.color"
            :variant="confirmBtn.variant"
            :ripple="confirmBtn.ripple"
            @click="onConfirm"
        >
          {{ confirmBtn.text }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>