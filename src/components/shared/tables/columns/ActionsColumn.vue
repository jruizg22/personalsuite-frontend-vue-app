<script setup lang="ts">
/**
 * ActionsColumn.vue
 *
 * A reusable component that renders a set of action buttons for a table row
 * or any item in a list. Typically used for "view", "edit", and "delete" actions.
 *
 * Features:
 * - Displays optional buttons for viewing, editing, and deleting an item.
 * - Buttons are small icons with Vuetify styling.
 * - Each button has a localized tooltip using vue-i18n.
 * - Aligns buttons in a horizontal row and centers them.
 *
 * Props:
 * - `item` (generic type T): The data item the actions are associated with.
 * - `onView` (function, optional): Callback executed when the "view" button is clicked. Receives the item as argument.
 * - `onEdit` (function, optional): Callback executed when the "edit" button is clicked. Receives the item as argument.
 * - `onDelete` (function, optional): Callback executed when the "delete" button is clicked. Receives the item as argument.
 *
 * Example usage:
 * ```vue
 * <ActionsColumn
 *   :item="channel"
 *   :onView="openChannelDetails"
 *   :onEdit="editChannel"
 *   :onDelete="deleteChannel"
 * />
 * ```
 *
 * Behavior:
 * - Each button is only rendered if its corresponding callback prop is provided.
 * - Buttons use Material Design Icons:
 *    - `mdi-eye` for view
 *    - `mdi-pencil` for edit
 *    - `mdi-delete` for delete
 * - Tooltips are automatically translated using vue-i18n with keys from `commonKeys`.
 *
 * Styling:
 * - Buttons are displayed in a horizontal row with a small gap (`8px`) between them.
 * - Buttons are centered using `justify-center`.
 */

import {useI18n} from 'vue-i18n'
import {commonKeys} from '@/i18n'

interface Props<T> {
  item: T,
  onView?: (item: T) => void,
  onEdit?: (item: T) => void,
  onDelete?: (item: T) => void,
}

defineProps<Props<any>>()

const {t} = useI18n()
</script>

<template>
  <div class="d-flex gap-2 justify-center">
    <v-btn
        v-if="onView"
        icon
        size="small"
        @click="onView(item)"
        v-tooltip:bottom="t(commonKeys.details)"
    >
      <v-icon color="primary">mdi-eye</v-icon>
    </v-btn>

    <v-btn
        v-if="onEdit"
        icon
        size="small"
        @click="onEdit(item)"
        v-tooltip:bottom="t(commonKeys.edit)"
    >
      <v-icon color="secondary">mdi-pencil</v-icon>
    </v-btn>

    <v-btn
        v-if="onDelete"
        icon
        size="small"
        @click="onDelete(item)"
        v-tooltip:bottom="t(commonKeys.delete)"
    >
      <v-icon color="error">mdi-delete</v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>