<script setup lang="ts">
/**
 * DateColumn.vue
 *
 * A reusable component for displaying formatted dates in a table column
 * or any text container.
 *
 * Features:
 * - Formats dates using `vue-i18n`'s `d` function.
 * - Supports multiple predefined formats (short, medium, long, full).
 * - Handles `string` or `Date` input, and gracefully displays empty string for null values.
 *
 * Props:
 * - `date` (string | Date | null): The date to display. Can be a Date object or an ISO string.
 * - `dateType` (DateType, optional): Format type to use. Defaults to `'short'`.
 *    Available formats are defined in your i18n `datetimeFormats` configuration.
 *    Example values: `'short'`, `'medium'`, `'long'`, `'full'`.
 *
 * Example usage:
 * ```vue
 * <DateColumn
 *   :date="item.createdAt"
 *   dateType="long"
 * />
 * ```
 *
 * Behavior:
 * - Converts `date` to a `Date` object if it's a string.
 * - If `date` is null or invalid, renders an empty string.
 * - Uses the current locale from vue-i18n to format the date accordingly.
 *
 * Notes:
 * - The component relies on `vue-i18n`'s `datetimeFormats` for proper formatting.
 * - Can be used in combination with table components to display localized dates consistently.
 */

import {useI18n} from 'vue-i18n'
import type {DateType} from '@/types'

interface Props {
  date: string | Date | null
  dateType: DateType
}

withDefaults(defineProps<Props>(), {
  dateType: 'short'
})

const {d} = useI18n()
</script>

<template>
  {{ date ? d(new Date(date), dateType) : "" }}
</template>